import "./cta.css";
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <div className=" container  cta  mx-auto  ">
      <div className="row">
        <div className="  col-md-8  cta-content  mb-0">
          <p> Request Early Access to Get Started</p>
          <h3>
            Register today and start secure yourself and your site from endless
            vulnerabilities..
          </h3>
        </div>
        <div className=" col-md-4   cta-btn mt-1 mb-0 ">
          <Link to="/signup">
            <button type="button"> Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CTA;
