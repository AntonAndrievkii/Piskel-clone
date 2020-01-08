import React, { PureComponent } from "react";
import './capability.css';

class Capability extends PureComponent {
  render() {
    const { text, imgPath } = this.props;
    return (<li className = "capability">
        <img className = "capability-img" src = {imgPath} alt = "" />
        <p className = "capability-text">{text}</p>
    </li>);
  }
}

export default Capability;