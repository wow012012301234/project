import React from 'react';
import './home.css';
import Feature from '../../component/features/features';

const Home = () => {
  

  return (
    <div className="home section__margin" id="home" >
      <div className="home-feature">
        <Feature title="What is vulnerability scanner" text="A vulnerability scanner is a tool that systematically checks Links , networks, or software for potential weaknesses that could be exploited by attackers. It helps identify and address security risks, enhancing overall cybersecurity and reducing the likelihood of breaches" />
      </div>
      <div className="home-heading">
        <h1 className="gradient__text animate__bounce">Unleash the power of limitless exploration in the Library for cutting-edge vulnerability scanning.</h1>
        <p className="animate__fadeInUp">Feel free to explore.</p>
      </div>
      <div className="home-container">
        <Feature title="Latest Threats and Trends:" text="Stay updated on cybersecurity trends. We keep you informed to ensure relevance and security." />
        <Feature title="Interactive Tools" text="Engage users with interactive tools. Try a scanner demo or a quick risk assessment quiz." />
        <Feature title="Knowledgebase" text="Explore our Knowledgebase for expert insights. Our concise articles simplify cybersecurity. Navigate guides to strengthen your defenses, whether you're a beginner or pro." />
      </div>
    </div>
  );
};

export default Home;
