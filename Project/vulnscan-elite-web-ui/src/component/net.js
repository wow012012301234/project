import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./NetworkScanner.css";

const socket = socketIOClient("http://localhost:3001");

function NetworkScanner() {
  const [targetHost, setTargetHost] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    socket.on("scanNetResult", (data) => {
        if (data.error) {
          setStatus(data.error);
        } else {
          setResult(data);
          setStatus("Scan Completed");
        }
      });

    return () => {
      socket.off("scanNetResult");
    };
  }, []);

  const startScan = () => {
    if (targetHost) {
      setStatus("Scanning...");
      socket.emit("scanNet", targetHost);
    }
  };


  return (
    <div className="scanner-container">
      <h1>Network Scanner</h1>
      <input
        type="text"
        value={targetHost}
        onChange={(e) => setTargetHost(e.target.value)}
        placeholder="Enter target host"
      />
      <button onClick={startScan}>Start Scan</button>
      <div className="status">{status}</div>
      <div className="result">
        {result && (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default NetworkScanner;