import React, { useState } from "react";
import "./header.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import people from "./people.png";


const urlPattern =
/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
const ipPattern =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const Header = () => {
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  const handleScanClick = () => {
    const trimmedTarget = target.trim();

    if (trimmedTarget) {
      if (ipPattern.test(trimmedTarget)) {
        navigate(`/dashboard/networkscan/${trimmedTarget}`);
      } else if (urlPattern.test(trimmedTarget)) {
        navigate(`/dashboard/webscan/target&=${trimmedTarget}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Input",
          text: "Please enter a valid URL or hostname.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        setTarget(""); // Clear the input field
      }
    } else {
      // Show error message if input is empty
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a URL or hostname.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAntivirusClick = () => {
    navigate("/uploadfile");
  };

  return (
    <div className="header section__padding" id="home">
      <div className="header-content">
        <h1 className="gradient__text">
          Unraveling Vulnerabilities, Empowering Unixty: Your Shield in
          Cyberspace
        </h1>

        <div className="header-content__input">
          <input
            type="text"
            placeholder="Enter URL, IP Address, or Hostname"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <button type="button" onClick={handleScanClick}>
            Scan Now
          </button>
        </div>

        <button className="antivirus-button" onClick={handleAntivirusClick}>
          Try Our Antivirus Now
        </button>

        <p>
          Unixty: Unraveling Vulnerabilities, Empowering Defenses. Your Digital
          Guardian in Cyberspace, Ensuring Total Security
        </p>

        <div className="header-content__people">
          <img src={people} alt="people" />
          <p>1,600 people got scanned in the last 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

// import React, { useState, useEffect } from 'react';
// import './header.css';
// import people from './people.png';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:3000');

// const Header = () => {
//   const [target, setTarget] = useState('');
//   const [result, setResult] = useState(null); // State to store the scan result

//   // useEffect to listen for scanWebResult event and update result state
//   useEffect(() => {
//     socket.on('scanWebResult', (data) => {
//       setResult(data.results); // Update result state with the received data
//     });

//     return () => {
//       socket.off('scanWebResult'); // Clean up socket listener
//     };
//   }, []);

//   const handleScanClick = () => {
//     const trimmedTarget = target.trim();

//     if (trimmedTarget) {
//       const isUrl = trimmedTarget.startsWith('http://') || trimmedTarget.startsWith('https://');
//       const endpoint = isUrl ? 'scanWeb' : 'scanNet';
//       socket.emit(endpoint, trimmedTarget);

//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Input',
//         text: 'Please enter a valid IP address or host name.',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   return (
//     <div className="header section__padding" id="home">
//       <div className="header-content">
//         <h1 className="gradient__text">
//           Unraveling Vulnerabilities, Empowering Unixty: Your Shield in Cyberspace
//         </h1>

//         <div className="header-content__input">
//           <input
//             type="text"
//             placeholder="Enter URL, IP Address, or Hostname"
//             value={target}
//             onChange={(e) => setTarget(e.target.value)}
//           />
//           <button type="button" onClick={handleScanClick}>
//             Scan Now
//           </button>
//         </div>

//         <p>
//           Unixty: Unraveling Vulnerabilities, Empowering Defenses. Your Digital
//           Guardian in Cyberspace, Ensuring Total Security
//         </p>

//         <div className="header-content__people">
//           <img src={people} alt="people" />
//           <p>1,600 people got scanned in the last 24 hours</p>
//         </div>

//         {result && (
//           <div>
//             <h2>Scan Result:</h2>
//             <ul>
//               {result.map((res, index) => (
//                 <li key={index}>
//                  <p><strong>Alert:</strong> {res.alert}</p>
//                 <p><strong>Description:</strong> {res.description}</p>
//                 <p><strong>URL:</strong> {res.url}</p>
//                 <p><strong>Risk:</strong> {res.risk}</p>
//                 <p><strong>Solution:</strong> {res.solution}</p>
//                 {/* Add other fields as necessary */}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;
