import React from "react";
import "./Footer.css";
import logo from "../../images/logo.png";

const Footer = (props) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div id="footer-about" className="col-sm-12 col-md-8">
            <h6>About</h6>
            <p>
              I'm an unemployed web developer. I worked my patootie off making this thing perfect so that you'll realize
              how brilliant I am and hire me. Also, <span className="orange">borrowly</span> is fully functional and can
              be as real as people make it, if you're feeling generous why not make an account and post something that
              people can borrow?
            </p>
          </div>
          <div className="col-xs-6 col-md-2">
            <h6>Links</h6>
            <ul className="footer-links">
              <li>
                <a href="https://clockmakerbrett.tech/" target="_blank" rel="noopener noreferrer">
                  My Portfolio
                </a>
              </li>
              <li>
                <a href="mailto:brettsherwood12@gmail.com">Email Me</a>
              </li>
            </ul>
          </div>
          <div className="col-xs-6 col-md-2">
            <h6>Profiles</h6>
            <ul className="footer-links">
              <li>
                <a href="https://www.linkedin.com/in/brett-sherwood12/" target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>
              </li>
              <li>
                <a href="https://github.com/clockmakerbrett" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/brett_the_1_and_only/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col signature">
            <img className="logo-gray" src={logo} alt="tree logo" />
            <p>&copy;2020, Brett Sherwood, All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
