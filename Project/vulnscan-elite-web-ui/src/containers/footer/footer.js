import React from "react";

import "./footer.css";
const Footer = () => {
  return (
    <div className="footer section__padding">
      <div className="footer-heading">
        <h1 className="gradient__text">
          Do you want to step in to the future before others
        </h1>
      </div>
      <div className="footer-btn">
        <p>Request Early Access</p>
      </div>
      <div className="footer-links">
        <div className="footer-links-logo">
          <h1> Unixty </h1>
        </div>
        <div className="footer-links_div">
          <h4>Links</h4>
          <p>overons</p>
          <p>Social Meadia</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className="footer-links_div">
          <h4>Company</h4>
          <p>Terms & Condition</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="footer-links_div">
          <h4>Get in touch </h4>
          <p>Addressss </p>
          <p>-01111111111</p>
          <p>info@.net</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2023 Unixty. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
