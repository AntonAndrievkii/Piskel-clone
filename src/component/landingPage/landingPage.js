import React, { PureComponent } from "react";
import General from "./general/general";
import Examples from "./examples/examples";
import YouCan from "./youCan/youCan";
import Footer from "./footer/footer";
import './landingPage.css';

class Landing extends PureComponent {
  render() {
    return (
    <div>
        <General />
        <Examples />
        <YouCan />
        <Footer />
    </div>);
  }
}

export default Landing;