import React from "react";
import "../../styles/AboutView.css";
import picture from "../../images/about.jpeg";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const AboutView = (props) => {
  return (
    <main>
      <div className="container">
        <div className="center">
          <div className="view-wrapper">
            <section id="about">
              <div id="about-text">
                <h1 className="spaced">About</h1>
                <p>
                  Borrowly is a community for lending/borrowing <span className="orange">things</span>, no strings
                  attached.
                </p>
                <p>
                  Well, maybe one string... you need a <span className="orange">favor</span> in order to borrow
                  something. You get favors when you let folks borrow something of yours.
                </p>
                <p>
                  But we all come into this world with the right to ask for what we want. So you'll start out with one
                  favor right from the get go.
                </p>
                {(props.user && (
                  <>
                    <p>
                      <Link to="/">See what there is to borrow</Link>
                    </p>
                    <p>
                      <Link to="/things/create">Contribute something to the community</Link>
                    </p>
                  </>
                )) || (
                  <>
                    <p>
                      <Link to="/sign-in">Sign-In if you have an account</Link>
                    </p>
                    <p>
                      <Link to="/sign-up">Sign-Up if you don't</Link>
                    </p>
                  </>
                )}
              </div>
              <div>
                <img id="picture" src={picture} alt="picking fruit" />
              </div>
            </section>
            <section>
              <hr className="thick" style={{ marginTop: "8rem" }} />
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

export default AboutView;
