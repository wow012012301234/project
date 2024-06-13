import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import NetworkScan from "./NetworkScan";
import { LoadingNetwork } from "../loading/Loading";
import "./target.css"

const socket = socketIOClient("http://localhost:3000");

const Target = () => {
  const { host } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanFinished, setScanFinished] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Emitting the scanNet event with the host parameter
    socket.emit("scanNet", host);
    setStatus("Scanning...");

    // Listening for the scanNetResult event
    socket.on("scanNetResult", (data) => {
      if (data.message === "Scan Stopped") {
        setStatus("Scan Stopped");
      } else if (data.error) {
        setStatus(data.error);
      } else {
        setItem(data);
        setScanFinished(true);
        setStatus("Scan Completed");
      }
    });

    // Cleanup: Removing the socket listener when component unmounts
    return () => {
      socket.off("scanNetResult");
    };
  }, [host]);

  // Set loading to false only when scan is finished
  useEffect(() => {
    if (scanFinished) {
      setLoading(false);
    }
  }, [scanFinished]);

  return (
    <>
      {loading &&status=="Scanning..." ?<LoadingNetwork />:""}
      <NetworkScan item={item} host={host} status={status}  loading={loading}/>
    </>
  );
};

export default Target;


