import React from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import Footer from "../../containers/footer/footer";
export default function NetworkScan({ item, host, loading , status }) {
  return (
    <div className="container-fluid target-container ">
      <div className="target-header row justify-content-between">
        <div className="col-3 col-lg-2 w-80">
          <Link to="/">
            <GoArrowLeft className="icons" />
          </Link>
          <span className="logo">Unixty</span>
        </div>
        <div className="col-3 col-lg-2 w-80">
          <span className="slide-name">User Name</span>
          <FaRegCircleUser className="icons" />
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-11 target-title">
          {loading && <p className="fs-2 fw-bold text-center">Loading Result...</p>}
          {!loading && (
            <>
              <h1>Scan Details For Target {`<${host}>`}</h1>
            </>
          )}
        </div>
       
        {!loading && item && item.ports && (
          <div className=" col-11 mx-auto  mt-lg-0 mt-5 target-vuln-detil ">
            <div className="row justify-content-between">
              {item.ports.map((port, index) => (
                <div className="col-12 items" key={index}>
                  <div className="row justify-content-between fw-bold">
                    <div className="col-lg-3 mx-1 col-4 item">
                      <h3>PortNumber:</h3>
                      <p>{port.portNumber}</p>
                    </div>
                    <div className="col-lg-2 mx-1 col-4 item ">
                      <h3>Protocol:</h3>
                      <p> {port.protocol}</p>
                    </div>
                    <div className="col-lg-2 mx-lg-3 mx-1 col-4 item">
                      <h3>Service:</h3>
                      <p> {port.service}</p>
                    </div>
                    <div className="col-lg-3 mx-lg-3 mx-1 col-4 item">
                      <h3>CVEs:</h3>
                      <p className="cve">
                        {port.cve && port.cve.length > 0
                          ? port.cve.join(",  ")
                          : "null"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
         {!loading && item && (
          <div className=" col-11 mx-auto mt-5    target-content">
            <div className="row">
              <div className="col-2 ">
                <h3>host</h3>
                <p>{host}</p>
              </div>
              <div className="col-2">
                <h3>Status</h3>
                <p>{status}</p>
              </div>
              <div className="col-2">
                <h3>Scan-Type</h3>
                <p>Network Scan</p>
              </div>
              <div className="col-2">
                <h3>Risk-Level</h3>
                {(() => {
                  const totalCVEs = item.ports.reduce(
                    (acc, port) => acc + (port.cve ? port.cve.length : 0),
                    0
                  );

                  if (totalCVEs === 0) {
                    return <p>Safe</p>;
                  } else if (totalCVEs < 4) {
                    return <p>Low</p>;
                  } else if (totalCVEs < 8) {
                    return <p>Medium</p>;
                  } else if (totalCVEs < 10) {
                    return <p>High</p>;
                  } else {
                    return <p>Critical</p>;
                  }
                })()}
              </div>
              <div className="col-4">
                <h3>Date</h3>
                <p>{new Date().toLocaleString()}</p>
              </div>
             
            </div>
          </div>
        )}
        <div className="row justify-content-center text-center">
          <div className="col-6 m-5">
            <button type="button" className="btn btn-outline-danger btn-lg">
              <Link to={"/"}> Back to Home</Link>
            </button>
          </div>
        </div>
        {!loading&& <Footer />}
       
      </div>
    </div>
  );
}




