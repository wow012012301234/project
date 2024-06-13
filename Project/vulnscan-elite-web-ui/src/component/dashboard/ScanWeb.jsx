import React, { useRef, useState } from "react";
import Footer from "../../containers/footer/footer";
import Navbar from "../navbar/navbar";
import DownloadExcel from "./DownloadExcel";

export default function ScanWeb(props) {
  const [details, setDetails] = useState([]);

  let resultsToShow;

  if (props.result.length > 10) {
    resultsToShow = props.result.slice(0, 10);
  } else {
    resultsToShow = props.result;
  }

  const toggleDetails = (index) => {
    const detailIndex = details.findIndex((item) => item.index === index);
    if (detailIndex === -1) {
      setDetails([...details, { index, showDetails: true }]);
    } else {
      const updatedDetails = [...details];
      updatedDetails[detailIndex] = {
        index,
        showDetails: !updatedDetails[detailIndex].showDetails,
      };
      setDetails(updatedDetails); // Update details array
    }
  };

  return (
    <>
      <Navbar />
      <div className="container webscan-cont my-5">
        <h1 className="text-white fs-4 px-3">
          Scan Details For Target {`< ${props.target} >`}
        </h1>
        <div className="responsive-table webscan-cont ">
          <div className="table-header d-flex fw-bold text-white text-center p-lg-3 p-2 justify-content-between flex-wrap">
            <div className=" col-1">#</div>
            <div className=" col-4">Address</div>
            <div className="d-none d-lg-block col-3">Risk</div>
            <div className="  col-4">Vulnerability</div>
          </div>
          <div className="body text-white overflow-hidden position-relative">
            {resultsToShow.length > 0 ? (
              resultsToShow.map((res, index) => (
                <div
                  className="result d-flex justify-content-between align-items-start p-3 rounded-3 flex-wrap"
                  key={index}
                >
                  <div className="col-1 text-center">{index + 1}</div>
                  <div
                    className="col-6  text-start "
                    style={{ wordWrap: "break-word" }}
                  >
                    <p>{res.url}</p>
                  </div>

                  <div className="risks d-flex d-lg-block d-none align-items-center justify-content-end">
                    {res.risks.map((risk) => (
                      <div
                        key={risk.riskLevel}
                        className={`risk rounded-circle ${
                          risk.riskLevel === "High"
                            ? "bg-danger riskhigh"
                            : risk.riskLevel === "Medium"
                            ? "bg-warning riskMeduim"
                            : risk.riskLevel === "Low"
                            ? "bg-primary risklow"
                            : risk.riskLevel === "Informational"
                            ? "bg-success riskinfo"
                            : ""
                        }`}
                      >
                        {risk.count}
                      </div>
                    ))}
                  </div>
                  <div className="col-3 col-md-5 text-center">
                    <p
                      className="text-decoration-underline text-info fs-6 cursor-pointer"
                      onClick={() => toggleDetails(index)}
                    >
                      {details.some(
                        (item) => item.index === index && item.showDetails
                      )
                        ? "Hide vulnerabilities details"
                        : "Show vulnerabilities details"}
                    </p>
                  </div>
                  {details.some(
                    (item) => item.index === index && item.showDetails
                  ) && (
                    <div className=" overflow-hidden">
                      <div
                        className={`result-vuln result d-flex justify-content-between col-12 flex-wrap align-items-center p-3 ${
                          details.some(
                            (item) => item.index === index && item.showDetails
                          )
                            ? "animate"
                            : ""
                        }`}
                      >
                        <p className="text-white p-2 col-12 fw-bold border-bottom border-white">
                          Vulnerabilities that exist in this address
                        </p>
                        <div className="col-12 d-flex justify-content-lg-between flex-wrap">
                          {res.alert.map((vuln, idx) => (
                            <div
                              key={idx}
                              className="col-lg-6 col-12 d-flex align-items-center pe-3 py-2"
                            >
                              <p className="px-2 py-0 my-0 col-8 ">
                                {vuln.alert}
                              </p>
                              <p
                                className={`px-2 py-0 my-0 col-4 overflow-hidden  mt-2 border rounded-2 text-center ${
                                  vuln.riskLevel === "High"
                                    ? "text-danger border-danger"
                                    : vuln.riskLevel === "Medium"
                                    ? "text-warning border-warning"
                                    : vuln.riskLevel === "Low"
                                    ? "text-primary border-primary"
                                    : vuln.riskLevel === "Informational"
                                    ? "text-success border-success"
                                    : ""
                                }`}
                              >
                                {vuln.riskLevel}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="fs-4 px-2">Processing ...</div>
            )}
          </div>
          {resultsToShow.length > 0 && (
            <div className="getresult px-5 mt-4">
              <DownloadExcel results={props.result} target={props.target} />
            </div>
          )}
        </div>
      </div>
     {resultsToShow.length > 0 ?<Footer />:""} 
    </>
  );
}
