import React from "react";
import "../../styles/AboutView.css";
import picture from "../../images/about.jpeg";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const AboutView = (props) => {
  return (
    <main>
      <div className="container view-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="margin-bottom">About</h1>
          </div>
        </div>
        <div className="row">
          <div id="about-text" className="col-12 col-md-7">
            <p>
              Borrowly is a community for lending/borrowing <span className="orange">things</span>, no strings attached.
            </p>
            <p>
              Well, maybe one string... you need a <span className="orange">favor</span> in order to borrow something.
              You get favors when you let folks borrow something of yours.
            </p>
            <p>
              But we all come into this world with the right to ask for what we want. So you'll start out with one favor
              right from the get go.
            </p>
            {(props.user && (
              <>
                <p>
                  <Link to="/">Discover</Link> what there is to borrow
                </p>
                <p>
                  <Link to="/things/create">Contribute</Link> something to the community
                </p>
              </>
            )) || (
              <>
                <p>
                  <Link to="/sign-in">Sign-In</Link> if you have an account
                </p>
                <p>
                  <Link to="/sign-up">Sign-Up</Link> if you don't
                </p>
              </>
            )}
          </div>
          <div id="about-image-container" className="col-12 col-md-5">
            <img id="about-image" src={picture} alt="picking fruit" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr className="thick" style={{ marginTop: "8rem" }} />
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

export default AboutView;
