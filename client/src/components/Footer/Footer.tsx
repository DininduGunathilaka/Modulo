import React from 'react'
import "../../styles/Footer.scss"
import LogoLight from "../../assets/img/LogoModulo Light.png"
import logo99xLight from "../../assets/img/logo99xLight.png"

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <div className="footer-container">
        <div className="pg-footer">
    <footer className="footer">
        <path className="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
      <div className="footer-content">
        <div className="footer-content-column">
          <div className="footer-logo">
            <a className="footer-logo-link" href="/home">
              <span className="hidden-link-text">LOGO</span>
              <img className="footer-modulo-logo" src={LogoLight} alt="Logo" />
            </a>
          </div>
        </div>
        <div className="footer-content-column">
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Explore</h2>
            <ul id="menu-company" className="footer-menu-list">
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#features">Features</a>
              </li>
              <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                <a href="#our-team">Our Team</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Get Started</h2>
            <ul id="menu-legal" className="footer-menu-list">
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                <a href="/register">Register Institute</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="/doc">Documentation</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content-column">
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Telephone</h2>
            <ul id="menu-quick-links" className="footer-menu-list">
              <li className="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="tel:+94703896644">Gayan - +947xxx</a>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="tel:+94">Dinindu - +947xxx</a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Email</h2>
            <ul id="menu-quick-links" className="footer-menu-list">
              <li className="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="mailto:teamfixit@gmail.com">teamfixit@gmail.com</a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <h2 className="footer-menu-name"> Address</h2>
            <ul id="menu-quick-links" className="footer-menu-list">
              <li className="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="https://uom.lk">University of Moratuwa</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content-column">
          <div className="footer-call-to-action">
            <h2 className="footer-call-to-action-title"> Company Mentored</h2>
            <img className="footer-99x-logo" src={logo99xLight} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="footer-copyright-wrapper">
          <p className="footer-copyright-text">
            <p className="footer-copyright-link" > ©{year} | Team FIX-IT - Faculty of IT, University of Moratuwa | All rights reserved </p>
          </p>
        </div>
      </div>
    </footer>
  </div>
    </div>
  )
}

export default Footer