import "./faq.css";
import React from "react";
import QA from "../../component/Q&A/Q&A";

const FAQ = () => {
  return (
    <div className=" container faq-container">
      <div className="row">
        <div className=" col-12 col-lg-5 fqa-left-header">
          <h1 className="gradient__text">
            Common questions about web vulnerability scanning
          </h1>
        </div>
        <div className=" col-12 col-lg-7 fqa-right-question">
          <div className="row ">
            <div className="col-12 mb-5">
              <QA
                ques="What is a web vulnerability scanner?"
                answer="Vulnerability scanning is commonly considered to be the most efficient way to check your site against a huge list of known vulnerabilities - and identify potential weaknesses in the security of your applications. Vulnerability scanning can be used as part of a standalone assessment, or as part of a continuous overall security monitoring strategy"
              />
            </div>
            <div className="col-12 mb-5">
              <QA
                ques="How does a web vulnerability scanner work?"
                answer="Web vulnerability scanners work by automating several processes. These include application spidering and crawling, discovery of default and common content, and probing for common vulnerabilities."
              />
            </div>
            <div className="col-12 mb-5">
              <QA
                ques="how long does a website security scan take"
                answer="The duration of a scan depends on many things, including network latency, size of site being scanned, the server’s resources and services running on the scanned server. The average scan time for a network scan is 20 minutes, while the average time for a web scan is between 2 and 4 hours."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FAQ;
