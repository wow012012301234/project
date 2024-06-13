import React from 'react';

import Feature from '../../component/features/features'
import './features.css';

const featuresData = [
  {
    title: 'Cross-Site Scripting (XSS)',
    text: 'XSS is a common web vulnerability where attackers inject malicious scripts into web pages viewed by other users. These scripts can steal user data, manipulate content, or redirect users to malicious sites.',
  },
  {
    title: 'SQL Injection',
    text: 'occurs when attackers inject malicious SQL code into input fields or parameters, manipulating a web applications database',
  },
  {
    title: 'XML External Entity (XXE) Injection:',
    text: 'XXE allows attackers to manipulate XML input, leading to sensitive information exposure or service disruption.',
  },
  {
    title: 'Cross-Site Request Forgery (CSRF)',
    text: 'Exploits web app trust in a users browser, tricking users into unwittingly making malicious requests, potentially performing actions on the victims behalf without consent',
  },
];

const Features = () => (
  <div className="features section__padding" id="features">
    <div className="features-heading">
      <h1 className="gradient__text"> Navigating the Web's Vulnerable Terrain: Insights into four Prominent Security Risks</h1>
      
    </div>
    <div className="features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;