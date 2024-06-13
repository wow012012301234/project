import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <h1> Unixty </h1>
        </div>
        <div className="navbar-links_container">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/dashboard">Scanning</Link>
          </p>
          <p>
            <Link to="/contect">Conect US</Link>
          </p>
          <p>
            <Link to="/faq">FQ&A</Link>
          </p>
          <p>
            <Link to="/blog">Blog</Link>
          </p>
        </div>
      </div>
      <div className="navbar-sign">
        <p>
          <Link to="/login">Sign in</Link>
        </p>
        <Link to="/signup">
          <button type="button">Sign up</button>
        </Link>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <p>
                <Link to="/">Home</Link>
              </p>
              <p>
                <Link to="/dashboard">Scanning</Link>
              </p>
              <p>
                <Link to="/about">About</Link>
              </p>
              <p>
                <Link to="/faq">FQ&A</Link>
              </p>
              <p>
                <Link to="/blog">Blog</Link>
              </p>
              
            </div>
            <div className="navbar-menu_container-links-sign">
              <p>
                <Link to="/login">Sign in</Link>
              </p>
              <Link to="/signup">
                <button type="button">Sign up</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
