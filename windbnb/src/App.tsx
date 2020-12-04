import * as React from "react";
import logo from "./assets/logo.png";
import "./style/app.scss";

const App = () => {
  return (
    <div>
      <img src={logo} className="logo" />
      <h2>My Own React Tooling</h2>
      <ul className="tooling">
        <li className="tooling--item">Webpack</li>
        <li className="tooling--item">ESBuild</li>
      </ul>
    </div>
  );
};

export default App;
