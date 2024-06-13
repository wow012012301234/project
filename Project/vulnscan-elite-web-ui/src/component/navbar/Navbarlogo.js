import { Link } from "react-router-dom";
import "./navbar.css";
const Navbarlogo = () => {
  return (
    <div className=" container-fluid">
      <div className="row">
        <div className="col navbar-links_logo">
          <Link to="/">
            <h1> Unixty </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbarlogo;

