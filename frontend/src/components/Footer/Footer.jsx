import React from 'react'
import { Link } from 'react-router-dom';

import './Footer.css'

import instagram from '../../assets/images/footer/instagram.svg';
import facebook from '../../assets/images/footer/facebook.svg';
import youtube from '../../assets/images/footer/youtube.svg';


const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-top'>
        <div className='footer-logo'>
          <h2>3legant<span>.</span></h2>
          <span className='footer-logo-line'></span>
          <p>Gift & Decoration Store</p>
        </div>
        <div className='footer-nav'>
          <Link className='footer-nav-link' to='/'>Home</Link>
          <Link className='footer-nav-link' to='/shop'>Shop</Link>
          <Link className='footer-nav-link' to='/contact-us'>Contact Us</Link>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='footer-bottom-left'>
          <h4 className='footer-bottom-left-copyright'>Copyright © 2024 3legant. All rights reserved</h4>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
        </div>
        <div className='footer-bottom-right'>
          <img src={instagram} alt="instagram" />
          <img src={facebook} alt="facebook" />
          <img src={youtube} alt="youtube" />
        </div>
      </div>
    </div>
  )
}

export default Footer;