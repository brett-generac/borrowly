import React from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  let favors = "";
  if (props.user) favors = props.user.favors === 1 ? "favor" : "favors";
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <img id="navbar-logo" src={logo} alt="tree logo" />
      <Link className="navbar-brand" to="/">
        <h3>
          borrow<span className="orange">ly</span>
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
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse bg-light" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {(props.user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/things/create">
                  Contribute
                </Link>
              </li>
              <li className="nav-item dropdown d-none d-md-block">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>Hi, {props.user.name}</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/profile/borrows">
                    Borrows
                  </Link>
                  <Link className="dropdown-item" to="/profile/things">
                    Things
                  </Link>
                  <Link className="dropdown-item" to="/profile/history">
                    History
                  </Link>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={props.handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </li>
              <li id="nav-item-favors" className="nav-item d-none d-md-block">
                <small>
                  {props.user.favors} {favors}
                </small>
              </li>
              <li className="nav-item d-md-none">
                <Link className="nav-link" to="/profile/borrows">
                  Borrows
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <Link className="nav-link" to="/profile/things">
                  Things
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <Link className="nav-link" to="/profile/history">
                  History
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li id="nav-item-favors" className="nav-item d-md-none">
                <small>
                  {props.user.favors} {favors}
                </small>
              </li>
              <li id="nav-item-sign-out" className="nav-item d-md-none">
                <button className="btn btn-secondary" onClick={props.handleSignOut}>
                  Sign Out
                </button>
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
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
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
