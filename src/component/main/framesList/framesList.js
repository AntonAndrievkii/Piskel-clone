import React, { Component } from "react";
import Frame from './frame/frame';
import './framesList.css';

class FramesList extends Component {
  render() {
    const { frameChanger, activeFrame, frames, framesQuantityUpdater, framesDelete, framesDuplicate, canvasSize } = this.props;
    return (<ul className="frames">
            {frames.map((el, idx) => {
            return <Frame
                key = {idx}
                img = {el.image}
                canvasSize = {canvasSize}
                active={activeFrame === idx}
                frameChanger = {frameChanger.bind(this, idx)}
                framesDelete = {framesDelete.bind(this, idx)}
                framesDuplicate = {framesDuplicate.bind(this, idx)}
            />}
           )}
           <li onClick={framesQuantityUpdater} className="frames-add">add frame</li>
        </ul>);
  }
}

export default FramesList;