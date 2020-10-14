import React from "react";
import logo from "../../images/logo.png";

const ErrorView = (props) => {
  return (
    <main>
      <div className="container view-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="huge margin-bottom">Whoops!</h1>
            <h1 className="orange margin-bottom">There was an error</h1>
            <h5 className="margin-bottom">Error message: {props.error.message}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr className="thick" style={{ marginTop: "12rem" }} />
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

export default ErrorView;
