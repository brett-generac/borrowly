import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const NotFoundView = () => {
  return (
    <main>
      <div className="container">
        <div className="center">
          <div className="view-wrapper">
            <section>
              <h1 className="huge spaced">Whoops!</h1>
              <h1 className="orange spaced">The page you're looking for doesn't exist</h1>
              <h5 className="spaced">Error code: 404</h5>
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
              <hr className="thick" style={{ marginTop: "10rem" }} />
              <div className="signature">
                <img className="logo-gray" src={logo} alt="tree logo" />
                <p>&copy;2020, Brett Sherwood, All rights reserved</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundView;
