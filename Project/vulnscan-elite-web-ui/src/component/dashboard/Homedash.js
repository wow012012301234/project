import React from 'react';
import { BsArrowDown, BsExclamationCircle, BsArrowUp, BsArrowUpRight } from 'react-icons/bs';
import { LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ScannerStatusPieChart from './pie';

const generateDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  while (start <= end) {
    dateArray.push(new Date(start).toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
};

const dateRange = generateDates('2023-01-01', '2023-01-07');

const data = dateRange.map(date => ({
  name: date,
  Low: Math.floor(Math.random() * 5000) + 1000,
  Medium: Math.floor(Math.random() * 5000) + 1000,
  High: Math.floor(Math.random() * 5000) + 1000,
  Critical: Math.floor(Math.random() * 5000) + 1000,
}));

const data1 = [
  { name: 'Low', value: 300 },
  { name: 'Medium', value: 1552 },
  { name: 'High', value: 333 },
  { name: 'Critical', value: 42 },
];

const Homedash = () => {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h2>DASHBOARD</h2>
      </div>
      <div className='main-cards'>
        {data1.map((item, index) => (
          <div className='card' key={index}>
            <div className='card-inner'>
              <h3>{item.name}</h3>
              {index === 0 && <BsArrowDown className='card_icon' />}
              {index === 1 && <BsExclamationCircle className='card_icon' />}
              {index === 2 && <BsArrowUp className='card_icon' />}
              {index === 3 && <BsArrowUpRight className='card_icon' />}
            </div>
            <h1>{item.value}</h1>
            <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data1}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
          </div>
        ))}
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <h3>Security Over Time</h3>
          <div className='legend'>
              <span className='legend-item low'></span> Low
              <span className='legend-item medium'></span> Medium
              <span className='legend-item high'></span> High
              <span className='legend-item critical'></span> Critical
            </div>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              width='100%'
              height={300}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray='4 4' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Area type='monotone' dataKey='Low' stackId='1' stroke='green' fill='green' />
              <Area type='monotone' dataKey='Medium' stackId='1' stroke='orange' fill='orange' />
              <Area type='monotone' dataKey='High' stackId='1' stroke='red' fill='red' />
              <Area type='monotone' dataKey='Critical' stackId='1' stroke='darkred' fill='darkred' />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='blue-card'>
          <ScannerStatusPieChart inProgressPercentage='30%' scannedPercentage='70%' />
        </div>
      </div>
    </main>
  );
};

export default Homedash;