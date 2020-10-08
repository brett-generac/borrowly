import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const NotFoundView = () => {
  return (
    <main>
      <div className="container view-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="huge margin-bottom">Whoops!</h1>
            <h1 className="orange margin-bottom">The page you're looking for doesn't exist</h1>
            <h5 className="margin-bottom">Error code: 404</h5>
            <h5>How about trying one of these pages?</h5>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign-Up</Link>
              </li>
              <li>
                <Link to="/sign-in">Sign-In</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr className="thick" style={{ marginTop: "10rem" }} />
            <div className="signature">
              <img className="logo-gray" src={logo} alt="tree logo" />
              <p>&copy;2020, Brett Sherwood, All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundView;
