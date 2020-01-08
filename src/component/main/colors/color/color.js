import React, { PureComponent } from "react";
import './color.css';

class Color extends PureComponent {
    render() {
      const { el, color, colorChanger } = this.props;
      return (<li className = "colors__color">
                <label style = {{backgroundColor: color}} className = "colors__color-circle colors__color-circle_current-color" htmlFor = {el.htmlFor}>
                    <input onInput = {colorChanger} id = {el.id} className = "colors__color-input" type = "color" />
                </label>
                <p className = "colors__color-name">{el.text}</p>
              </li>);
    }
}

export default Color;