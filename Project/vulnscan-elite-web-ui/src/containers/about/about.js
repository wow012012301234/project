
import React from 'react';
import { Link } from "react-router-dom";
import './about.css'
import about from './about.jpeg'


const About = () => (
    <div className="about section__padding" id="about">
      <div className="about-image">
        <img src={about} alt="about image" />
      </div>
      <div className="about-content">
       
        <h4>Request Early Access to Get Started</h4>
        
        <h1 className="gradient__text">Our Commitment  <br /> to Web Security</h1>
        <p>Import and scan your internal and external attack surfaces.

Manage your risks via dashboards, alerts, and powerful reporting.</p>
        
      </div>
    </div>
  );
  
  export default About;
