import React, { useState } from 'react';
import './faq.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../../containers/footer/footer';
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import faqdata from './faqdata.json';

const data = faqdata;

const FQA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (searchTerm) => {
    const filteredData = data.filter((item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const toggleAnswer = (id) => {
    setFilteredData(
      filteredData.map((item) =>
        item.id === id ? { ...item, showAnswer: !item.showAnswer } : item
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="header section__padding" id="home">
        <div className="header-content">
          <h1 className="gradient__text"> Got Questions!? We have the answers</h1>
          <div className="header-content__input">
            <input
              type="text"
              placeholder="Search a Question"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="faq-list">
            {filteredData.map((item) => (
              <div key={item.id} className="faq-item">
                <div className="question">
                  <div className="question-text">{item.question}</div>
                  <button
                    onClick={() => toggleAnswer(item.id)}
                    className={`toggle-answer ${item.showAnswer ? 'active' : ''}`}
                  >
                    {item.showAnswer ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                </div>
                {item.showAnswer && (
                  <div className="answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
            
          </div>
          
        </div>
        
      </div>
      <div className='end'>
        <p> If you don't find your answers, <Link to='../contect'  className="gradient__text">Connect With US</Link></p>
      </div>
      <Footer />
    </div>
  );
};

export default FQA;



