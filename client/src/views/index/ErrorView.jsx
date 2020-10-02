import React from "react";

const ErrorView = (props) => {
  return (
    <main>
      <div className="container">
        <div className="center">
          <div className="wrapper">
            <section>
              <h1>Page not found</h1>
              <h1>There was an error</h1>
              <p>{props.error}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorView;
