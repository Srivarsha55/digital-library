import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="top">
          <div className="logo-details">
            <span className="logo_name">NebulaReads</span>
          </div>
          <div className="media-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
        <div className="link-boxes">
          <ul className="box">
            <li className="link_name">Company</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/about">About us</Link></li>
          </ul>
          <ul className="box">
            <li className="link_name">Account</li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/account">My account</Link></li>
            <li><Link to="/preferences">Preferences</Link></li>
            <li><Link to="/purchase">Purchase</Link></li>
          </ul>
          <ul className="box">
            <li className="link_name">Library</li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/journals">Journals</Link></li>
            <li><Link to="/membership">Membership</Link></li>
          </ul>
          <ul className="box input-box">
            <li className="link_name">Subscribe</li>
            <li><input type="text" placeholder="Enter your email" /></li>
            <li><input type="button" value="Subscribe" /></li>
          </ul>
        </div>
      </div>
      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">Copyright © 2024 <a href="#">DigitalLibrary.</a> All rights reserved</span>
          <span className="policy_terms">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms-condition">Terms & condition</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
