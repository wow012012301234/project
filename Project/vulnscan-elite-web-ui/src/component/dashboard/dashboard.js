// import React, { useState, useEffect } from 'react';
// import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:3000');

// const Dashboard = () => {
//   const [result, setResult] = useState([]);

//   useEffect(() => {
//     socket.on('scanWebResult', (data) => {
//       console.log('Received scan result:', data.results); // Log the received scan results
//       setResult(data.results);
//     });
//    return () => {
//       socket.off('scanWebResult');
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
      
          
        
//       </div>
   
//   );
// };
import React from 'react'
import { useState } from 'react';
import './dashboard.css';
import Headerbash from './headerbash';
import Sidebar from './Sidebar';
import Homedash from './Homedash';

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle((prevOpenSidebarToggle) => !prevOpenSidebarToggle);
  };
  
  return (
    <div className='dashboard'>
          

      <div className='grid-container'>
       <Headerbash OpenSidebar={OpenSidebar} />

        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}  />
        <Homedash />
      </div>
   
    </div>
  )
}

export default Dashboard ;