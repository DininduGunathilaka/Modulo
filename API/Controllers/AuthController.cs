﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            if (_context.Admins.Any(u => u.Email == request.Email))
            {
                return BadRequest("User already exists!");
            }

            CreatePasswordHash(request.Password,
                out byte[] passwordHash,
                out byte[] passwordSalt);

            var admin = new Admin
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken()
            };

            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return Ok("User successfully Registered!");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (admin == null)
            {
                return BadRequest("User not found!");
            }

            if (!VerifyPasswordHash(request.Password, admin.PasswordHash, admin.PasswordSalt))
            {
                return BadRequest("Password is incorrect!");
            }

            if (admin.VerifiedAt == null)
            {
                return BadRequest("Not verified!");
            }


            //return Ok($"Welcome Back, {user.Email}! :)");
            string token = CreateToken(admin);
            return Ok(token);
        }

        private string CreateToken(Admin user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(15),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }



        [HttpPost("verify")]
        public async Task<IActionResult> Verify(string token)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(u => u.VerificationToken == token);
            if (admin == null)
            {
                return BadRequest("Invalid Token!");
            }

            admin.VerifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();


            return Ok("User Verified");
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(u => u.Email == email);
            if (admin == null)
            {
                return BadRequest("User not found!");
            }

            admin.PasswordResetToken = CreateRandomToken();
            admin.ResetTokenExpires = DateTime.Now.AddMinutes(5);
            await _context.SaveChangesAsync();


            return Ok("You may now reset your password!");
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPWRequest request)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(u => u.PasswordResetToken == request.Token);
            if (admin == null || admin.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("Invalid Token!");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            admin.PasswordHash = passwordHash;
            admin.PasswordSalt = passwordSalt;
            admin.PasswordResetToken = null;
            admin.ResetTokenExpires = null;
            await _context.SaveChangesAsync();


            return Ok("You have reset the password successfully!");
        }



        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }


        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}
