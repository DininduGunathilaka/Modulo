using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class NoticeController : ControllerBase
    {
        private readonly DataContext _context;

        public NoticeController(DataContext context)
        {
           _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<List<Notice>>> Get()
        {
           return Ok(await _context.Notices.ToListAsync());
        }

        [HttpGet("notice")]
       
        public async Task<IActionResult> GetNoticesByNoticeType(string NoticeType)
        {
           var notice= await _context.Notices.FirstOrDefaultAsync(x => x.NoticeType == NoticeType);
           if(NoticeType is null){
               return NotFound();
           }
           
           return Ok(NoticeType);
        }

        [HttpPost]

        public async Task<ActionResult<List<Notice>>> Add(Notice notice)
        {
          _context.Notices.Add(notice);
          await _context.SaveChangesAsync();
          return Ok(await _context.Notices.ToListAsync());
        }

        [HttpPut]

         public async Task<ActionResult<List<Notice>>> Update(Notice request)
        {
          var notice = await _context.Notices.FindAsync(request.NoticeID);
          if(notice==null)
          return BadRequest("Notice Not Found!");

          notice.NoticeTitle = request.NoticeTitle;
          notice.Description = request.Description;

          await _context.SaveChangesAsync();

          return Ok(await _context.Notices.ToListAsync());
        }


        [HttpDelete("{id}")]

        public async Task<ActionResult<List<Notice>>>Delete(int id)
        {
         var notice = await _context.Notices.FindAsync(id);
         if(notice==null)
           return BadRequest("Notice not found!");

         _context.Notices.Remove(notice);

         await _context.SaveChangesAsync();

         return Ok(await _context.Notices.ToListAsync());
        }
 
    }
}