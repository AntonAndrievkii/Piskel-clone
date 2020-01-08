import React, { PureComponent } from "react";
import Capability from "./capability/capability";
import './youCan.css';

const capability = [
  {
    imgPath: 'assets/capabilityUseTools.jpg',
    text: 'Choose Tool, color and pen size',
  },
  {
    imgPath: 'assets/capabilityCreateFrame.jpg',
    text: 'Create frames',
  },
  {
    imgPath: 'assets/capabilitySelectSize.jpg',
    text: 'Choose canvas size',
  },
  {
    imgPath: 'assets/capabilityAnimate.jpg',
    text: 'Animate your frames',
  },
  {
    imgPath: 'assets/capabilityExport.jpg',
    text: 'Export to GIF',
  },
  {
    imgPath: 'assets/capabilityCreateFrame.jpg',
    text: 'Delete, duplicate frames',
  }];

class YouCan extends PureComponent {
  render() {
    return (<div className = "you-can-block">
        <h2 className = "you-can__headline">You Can</h2>
        <ul className = "you-can__examples">
          {capability.map((el, idx) => 
          <Capability 
            text = {el.text}
            imgPath = {el.imgPath}
            key = {idx}
          />)}
        </ul>
    </div>);
  }
}

export default YouCan;