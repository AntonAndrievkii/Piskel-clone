import React, { PureComponent  } from "react";
import './tool.css';

class Tool extends PureComponent  {
  render() {
    const { el, handleClick, active } = this.props;
    return (<li onClick={handleClick} id={el.id} className={"tools__tool " + ((active) ? "tools__tool_active" : "")}>
                <img className="tools__tool-img" src={el.imgPath} alt="" />
                <p className="tools__tool-name">{el.text}</p>
            </li>);
  }
}

export default Tool;