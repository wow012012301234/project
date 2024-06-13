

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'In Progress', value: 30 },
  { name: 'Scanned', value: 70 },
];

const COLORS = ['#7CFC00', '#000080'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ScannerStatusPieChart = () => {
  return (
    <div className='chart-container'>
      <h3>Scanner Status</h3>
      <div className="line-container">
        <div className="line" style={{ backgroundColor: COLORS[0] }}></div>
        <span className="line-text">In Progress</span>
      </div>
      <div className="line-container">
        <div className="line" style={{ backgroundColor: COLORS[1] }}></div>
        <span className="line-text">Scanned</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScannerStatusPieChart;
