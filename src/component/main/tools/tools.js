import React, { PureComponent } from "react";
import Tool from './tool/tool';
import './tools.css';

const tools = [
  {
    id: 'fill-bucket',
    imgPath: 'assets/paint-bucket.svg',
    text: 'Fill bucket',
  },
  {
    id: 'color-picker',
    imgPath: 'assets/choose-color.svg',
    text: 'Choose color',
  },
  {
    id: 'pencil',
    imgPath: 'assets/pencil.svg',
    text: 'Pencil',
  },
  {
    id: 'clear',
    imgPath: 'assets/transform.svg',
    text: 'Clear',
  },
  {
    id: 'eraser',
    imgPath: 'assets/eraser.png',
    text: 'Eraser',
  },
  {
    id: 'stroke',
    imgPath: 'assets/stroke.png',
    text: 'Stroke',
  },
  {
    id: 'allPixels',
    imgPath: 'assets/radar.svg',
    text: 'Paint all pixels of the same color',
  }];

class ToolsElementCreter extends PureComponent {
  render() {
    const { activeTool, toolSwitcher, canvasCleaner } = this.props;
    return (<ul className="tools">
              {tools.map((el, idx) => <Tool
                active={activeTool === idx} 
                handleClick={(idx === 3) ? canvasCleaner.bind(this) : toolSwitcher.bind(this, idx)} key = {idx} el = {el}
              />)}
            </ul>);
  }
}

export default ToolsElementCreter;
