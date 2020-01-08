import React, { PureComponent } from "react";
import GIFEncoder from "gifencoder";
import './preview.css';
const FileSaver = require('file-saver');

class Preview extends PureComponent {

  constructor(props) {
    super(props);
    this.animation = React.createRef();
    this.full = React.createRef();
  }

  idx = 0

  intervalId = null

  state = {
    fps: 1
  }

  componentDidMount() {
    this.animate();
    document.addEventListener("fullscreenchange", this.screen_change);
    document.addEventListener("webkitfullscreenchange", this.screen_change);
    document.addEventListener("mozfullscreenchange", this.screen_change);
    document.addEventListener("MSFullscreenChange", this.screen_change);

    document.addEventListener("fullscreenerror", function(){console.log("Full screen failed");});
    document.addEventListener("webkitfullscreenerror", function(){console.log("Full screen failed");});
    document.addEventListener("mozfullscreenerror", function(){console.log("Full screen failed");});
    document.addEventListener("MSFullscreenError", function(){console.log("Full screen failed");});
  }

  componentWillUnmount () {
    clearTimeout(this.intervalId);
    console.log('preview');
  }

  full_screen = () => {
    if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) {
      if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
        console.log("User allows fullscreen");
        const element = this.full.current;
        if("requestFullscreen" in element) {
            element.requestFullscreen();
        } else if ("webkitRequestFullscreen" in element) {
            element.webkitRequestFullscreen();
        } else if ("mozRequestFullScreen" in element) {
            element.mozRequestFullScreen();
        } else if ("msRequestFullscreen" in element) {
            element.msRequestFullscreen();
        }
      }
    } else {
        console.log("User doesn't allow full screen");
    }
  }

  screen_change = () => {
    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        console.log("Current full screen element is : " + (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement))
    } else {
      if ("exitFullscreen" in window) {
        document.exitFullscreen();
      } else if ("webkitExitFullscreen" in document) {
        document.webkitExitFullscreen();
      } else if ("mozCancelFullScreen" in document) {
        document.mozCancelFullScreen();
      } else if ("msExitFullscreen" in document) {
        document.msExitFullscreen();
      }
    }
  }

  animate = () => {
    this.intervalId = setTimeout(this.animate, 1000 / this.state.fps);
    const { frames } = this.props;
    const ctx = this.animation.current.getContext('2d');
    this.repeat(frames, ctx);
  }

  repeat= (frames, ctx) => {
    if(this.idx >= frames.length) this.idx = 0;
    if(frames[this.idx].image === null) return;
    const frameImg = frames[this.idx].image;
    ctx.putImageData(frameImg, 0, 0);
    this.idx++;
  }

  fpsChanger = (e) => {
    const fps = e.target.value;
    this.setState({ fps });
  }

  encode = () => {
    const { canvasSize, frames } = this.props;
    const encoder = new GIFEncoder(canvasSize,canvasSize);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / this.state.fps);
    encoder.setQuality(50);
    frames.forEach((el) => {
      encoder.addFrame(el.image.data, true);
    });
    encoder.finish();
    const buf = encoder.out.getData();
    return buf;
  }

  createGif = () => {
    const file = new File([this.encode()], "helloworld.gif", {type : "image/gif" });
    FileSaver.saveAs(file);
  }

  createApng = () => {
    const file = new File([this.encode()], "helloworld.apng", {type : "apng" });
    FileSaver.saveAs(file);
  }

  render() {
    const { canvasSize } = this.props;
    return (<div className="preview-block">
        <div ref={this.full} className="preview-block">
          <canvas ref={this.animation} className="preview" width={canvasSize} height={canvasSize}></canvas>
        </div>
        <input onInput = {this.fpsChanger} className="preview-input" type="range" min="1" max="24" defaultValue={this.state.fps} step="1" />
        <p className="preview-fps">{this.state.fps} FPS</p>
        <button onClick = {this.full_screen} className="preview-fullscreen">Full screen</button>
        <div className="export">
          <p className="export__text">Export to:</p>
          <button onClick = {this.createGif} className="export__format">gif</button>
          <button onClick = {this.createApng} className="export__format">apng</button>
        </div>
    </div>);
  }
}

export default Preview;