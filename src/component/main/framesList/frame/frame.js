import React, { PureComponent } from "react";
import './frame.css';
import '../../canvas/canvas';

class Frame extends PureComponent {
    constructor(props) {
        super(props);
        this.frame = React.createRef();
    }

    setCanvasImg = () => {
      const { img } = this.props;
      const ctx = this.frame.current.getContext('2d');
      ctx.putImageData(img, 0, 0);
    }
    
    componentDidMount() {
      if(this.props.img) {
        this.setCanvasImg();
      }
    }
    
    componentDidUpdate() {
      if(this.props.img) {
        this.setCanvasImg();
      }
    }

    render() {
      const { frameChanger, active, framesDelete, framesDuplicate, canvasSize } = this.props;
      return (<li id="frame" className={"frame " + ((active) ? "active-frame" : "")}>
                <canvas onClick={frameChanger} ref={this.frame} className="frame-canvas" width={canvasSize} height={canvasSize}></canvas>
                <img onClick={framesDelete} className="frame-delete" src="./assets/trashcan.svg" alt="" />
                <img onClick={framesDuplicate} className="frame-duplicate" src="./assets/copy.svg" alt="" />
              </li>);

    }
}

export default Frame;