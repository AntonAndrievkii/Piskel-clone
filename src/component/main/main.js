import React, { Component } from "react";
import ToolsElementCreter from './tools/tools';
import PenSizes from './pencilSizeBlock/pencilSizeBlock';
import ColorsElementCreter from './colors/colors';
import FramesList from './framesList/framesList';
import CanvasElementCreater from './canvas/canvas';
import Preview from './preview/preview';
import './main.css';

const frames = [{ image: null }];

class Main extends Component {
  constructor(props) {
    super(props);
    this.canvasBlock = React.createRef();
    this.preview = React.createRef();
  }

  state = {
    activeTool: (+localStorage.getItem('activeTool') || 1),
    activeSize: (+localStorage.getItem('activeSize') || 1),
    activeFrame: 0,
    colorPrimary: (localStorage.getItem('colorPrimary') || 'rgb(255, 255, 255)'),
    colorSecondary: (localStorage.getItem('colorSecondary') || 'rgb(255, 255, 255)'),
    canvasSize: (+localStorage.getItem('canvasSize') || 32),
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentDidUpdate () {
    this.localSave();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  localSave = () => {
    for (let key in this.state) {
      if( localStorage.getItem(`${key}`) !== this.state[key]) { 
        localStorage.setItem(`${key}`, this.state[key]);
      }
    }
  }

  toolSwitcher = (activeTool) => {
    this.setState({ activeTool });
  };

  sizeSwitcher = (activeSize) => {
    if(activeSize >= 1 && activeSize <= 4) {
      this.setState({ activeSize });
    }
  };

  frameChanger = (activeFrame) => {
    if(activeFrame >= 0 && activeFrame <= frames.length - 1) {
      this.setState({ activeFrame });
    }
  };

  canvasSizeChanger = (canvasSize) => {
    this.setState({ canvasSize });
  };

  framesDuplicate = (idx) => {
    const img = frames[idx].image;
    frames.splice(idx, 0, {image: img});
    const activeFrame = idx + 1;
    this.setState({ activeFrame });
  }

  framesDelete = (idx) => {
    if(frames.length === 1) return;
    frames.splice(idx, 1);
    const activeFrame = (this.state.activeFrame >= idx && this.state.activeFrame !== 0) ? this.state.activeFrame - 1 : this.state.activeFrame;
    this.setState({ activeFrame });
  }

  framesQuantityUpdater = () => {
    frames.push({
      image: null
    })
    const activeFrame = frames.length - 1;
    this.setState({ activeFrame });
  }

  frameImgUpdater = (img) => {
    const { activeFrame }  = this.state;
    frames[activeFrame].image = img;
    this.setState({ activeFrame });
  };

  colorSecondaryChanger = (e, isRGB = false) => {
    if(isRGB) {
      this.setState({ colorSecondary: e });
    } else {
      const colorSecondary = this.canvasBlock.current.hexToRGB(e.target.value);
      this.setState({ colorSecondary });
    }
  };

  colorPrimaryChanger = (e, isRGB = false) => {
    if(isRGB) {
      this.setState({ colorPrimary: e });
    } else {
      const colorPrimary = this.canvasBlock.current.hexToRGB(e.target.value);
      this.setState({ colorPrimary });
    }
  };

  colorSwap = () => {
    const colorPrimary = this.state.colorSecondary;
    const colorSecondary = this.state.colorPrimary;
    this.setState({ colorPrimary, colorSecondary });
  }

  canvasCleaner = () => {
    this.canvasBlock.current.clearCanvas();
    this.canvasBlock.current.updateActiveFrame();
  };

  onKeyPressed = (e) => {
    switch (e.code) {
      case 'KeyB':
        this.toolSwitcher(0);
        break;
      case 'KeyO':
        this.toolSwitcher(1);
        break;
      case 'KeyP':
        this.toolSwitcher(2);
        break;
      case 'KeyC':
        this.canvasBlock.current.clearCanvas();
        break;
      case 'KeyE':
        this.toolSwitcher(4);
        break;
      case 'KeyL':
        this.toolSwitcher(5);
        break;
      case 'KeyA':
        this.toolSwitcher(6);
        break;
      case 'Delete':
        this.framesDelete(this.state.activeFrame);
        break;
      case 'KeyQ':
        this.framesDuplicate(this.state.activeFrame);
        break;
      case 'KeyW':
        this.framesQuantityUpdater();
        break;
      case 'BracketRight':
        this.sizeSwitcher(this.state.activeSize + 1);
        break;
      case 'BracketLeft':
        this.sizeSwitcher(this.state.activeSize - 1);
        break;
      case 'ArrowUp':
        this.frameChanger(this.state.activeFrame - 1);
        break;
      case 'ArrowDown':
        this.frameChanger(this.state.activeFrame + 1);
        break;
      case 'KeyX':
        this.colorSwap();
        break;
      case 'KeyF':
        this.preview.current.full_screen();
        break;
      default: break;
    }
  }

  render() {
  return (<main className='main'>
            <div className="main__tools-and-colors">
              <ToolsElementCreter 
                activeTool={this.state.activeTool}
                toolSwitcher = {this.toolSwitcher}
                canvasCleaner = {this.canvasCleaner}
              />
              <PenSizes 
                activeSize={this.state.activeSize}
                sizeSwitcher = {this.sizeSwitcher}
              />
              <ColorsElementCreter  
                colorSecondary={this.state.colorSecondary}
                colorPrimary={this.state.colorPrimary}
                colorSecondaryChanger = {this.colorSecondaryChanger}
                colorPrimaryChanger = {this.colorPrimaryChanger}
              />
            </div>
            <FramesList
              canvasSize={this.state.canvasSize}
              frames = {frames}
              frameChanger = {this.frameChanger}
              framesQuantityUpdater = {this.framesQuantityUpdater}
              framesDelete = {this.framesDelete}
              framesDuplicate = {this.framesDuplicate}
              activeFrame={this.state.activeFrame}
            />
            <CanvasElementCreater 
              ref={this.canvasBlock}
              frames = {frames}
              canvasSize={this.state.canvasSize}
              activeFrame={this.state.activeFrame}
              canvasSizeChanger={this.canvasSizeChanger}
              frameImg = {frames[this.state.activeFrame].image}
              colorPrimary={this.state.colorPrimary}
              colorSecondary={this.state.colorSecondary}
              colorSecondaryChanger = {this.colorSecondaryChanger}
              colorPrimaryChanger = {this.colorPrimaryChanger}
              frameImgUpdater = {this.frameImgUpdater}
              activeTool={this.state.activeTool}
              activeSize={this.state.activeSize}
            />
            <Preview 
              ref={this.preview}
              frames = {frames}
              canvasSize={this.state.canvasSize}
            />
        </main>);
  }
}

export default Main;
