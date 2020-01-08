import React, { PureComponent } from "react";
import './example.css';

class Example extends PureComponent {
  render() {
    const { img } = this.props;
    return (<li className = "example">
        <img className = "example-img" src = {img} alt = "" />
    </li>);
  }
}

export default Example;