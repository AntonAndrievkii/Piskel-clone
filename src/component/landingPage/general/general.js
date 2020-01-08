import React, { PureComponent } from "react";
import './general.css';
import { Link } from "react-router-dom";

class General extends PureComponent {
  render() {
    return (<div className = "general">
        <div className = "general__description">
            <h2 className = "general__headline">This app is a clone<br/>of Piskel app</h2>
            <p className = "general__text">There you can create animations in your browser.</p>
            <Link to = '/main'>  
                <button className = "general__create-btn">Create Sprite</button>
            </Link>
        </div>
        <img className = "general__img" src = "assets/app.jpg" alt="" />
    </div>);
  }
}

export default General;