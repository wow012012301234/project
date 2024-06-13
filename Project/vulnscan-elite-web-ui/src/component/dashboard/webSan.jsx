import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socketIO from "socket.io-client";
import "./webscan.css";
import Loading from "../loading/Loading";
import ScanWeb from "./ScanWeb";

const socket = socketIO.connect("http://localhost:3000");

function WebScan() {
  const location = useLocation();
  const currentPath = location.pathname;
  const urlParts = currentPath.split("=");
  const lastPart = urlParts[urlParts.length - 1];
  const [status, setStatus] = useState("0");
  const [scanType, setScanType] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    socket.emit("scanWeb", lastPart);
    socket.on("scanWebResult", (data) => {
      setScanType(data.scanType);
      setStatus(data.status);
      setResult(data.results);
      if (data.scanType === "Scan Finished" && data.status === 100) {

        socket.off("scanWebResult");
      }
    });

    return () => {
      socket.off("scanWebResult");
    };
  }, [lastPart]);
  
  let getResultForEachUrl = (res) => {
    
      const resultTobeShow = res.reduce((result, value) => {
        const { url, risk, alert } = value;
        const existingUrlData = result.find((data) => data.url === url);
        
        if (existingUrlData) {
          const existingRisk = existingUrlData.risks.find((r) => r.riskLevel === risk);
          if (existingRisk) {
            existingRisk.count++;
          } else {
            existingUrlData.risks.push({ riskLevel: risk, count: 1 });
          }
          existingUrlData.alert.push({alert:alert,riskLevel: risk,});
        } else {
          result.push({
            url,
            risks: [{ riskLevel: risk, count: 1 }],
            alert: [{alert:alert,riskLevel: risk}],
          });
        }
        return result;
      }, []);
    
      return resultTobeShow;
    };
    
  return (
    <>
      {result.length === 0 && <Loading status={status} />}
      <ScanWeb result={getResultForEachUrl(result)} target={lastPart}  />
    </>
  );
}

export default WebScan;
