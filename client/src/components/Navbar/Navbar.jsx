import React from "react";
import "./Navbar.css";
import Icon from "../../images/person.svg";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">
        <h3>
          Borrow<span className="ly">ly</span>
        </h3>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {(props.user && (
            <>
              <li className="nav-item mr-5">
                <Link className="nav-link" to="/things/create">
                  Contribute SomeThing
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={Icon} alt="user icon" />
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/history">
                    History
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={props.handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/sign-in">
                  Sign-In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/sign-up">
                  Sign-Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
