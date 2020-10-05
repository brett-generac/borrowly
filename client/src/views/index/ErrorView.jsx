import React from "react";
import logo from "../../images/logo.png";
//can't get this to work because of componentDidCatch in error handler not being called

const ErrorView = (props) => {
  return (
    <main>
      <div className="container">
        <div className="center">
          <div className="wrapper">
            <section>
              <h1 className="huge spaced">Whoops!</h1>
              <h1 className="orange spaced">There was an error</h1>
              <h5 className="spaced">Error code:{props.error.code}</h5>
              <h5 className="spaced">Error message:{props.error.message}</h5>
              <hr className="thick" style={{ marginTop: "12rem" }} />
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

export default ErrorView;
