import React, { PureComponent } from "react";
import './size.css';

class Size extends PureComponent {
  render() {
    const { el, handleClick, active } = this.props;
    return (<li onClick={handleClick} className={"sizes__size " + ((active) ? "sizes__size-active" : "")}>
                <p className="sizes__size-text">{el}</p>
            </li>);
  }
}

export default Size;