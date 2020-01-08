import React, { PureComponent } from "react";
import './canvas.css';

class CanvasElementCreater extends PureComponent {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  lastX = 0

  lastY = 0 

  isDrawing = false

  imageData = null

  setCanvasImg = () => {
    const frameImg = this.props.frames[this.props.activeFrame].image;
    const ctx = this.canvas.current.getContext('2d');
    ctx.putImageData(frameImg, 0, 0);
  }

  updateActiveFrame = () => {
    const { canvasSize } = this.props;
    const ctx = this.canvas.current.getContext('2d');
    const canvasImage = ctx.getImageData(0, 0, canvasSize, canvasSize);
    this.props.frameImgUpdater(canvasImage);
  }

  componentDidMount() {
    this.canvas.current.oncontextmenu = () => {
      return false;
    };
    if(this.props.frameImg) {
      this.clearCanvas();
      this.setCanvasImg();
    } else {
      this.clearCanvas();
      this.updateActiveFrame();
    }
  }

  updateFrames = (canvasSize) => {
    this.canvas.current.width = canvasSize;
    this.canvas.current.height = canvasSize;
    const ctx = this.canvas.current.getContext('2d');
    this.props.frames.forEach((el) => {
      this.clearCanvas();
      const coord = (canvasSize / 2) - Math.sqrt(el.image.data.length / 4) / 2;
      ctx.putImageData(el.image, coord, coord);
      el.image = ctx.getImageData(0, 0, canvasSize, canvasSize);
    })
  }

  componentDidUpdate() {
    if(this.props.frameImg) {
      this.clearCanvas();
      this.setCanvasImg();
    } else {
      this.clearCanvas();
      this.updateActiveFrame();
    }
  }

  clearCanvas = () => {
    const ctx = this.canvas.current.getContext('2d');
    const { canvasSize } = this.props;
    ctx.fillStyle = 'rgb(128, 128, 128)';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
  }

  pixelFill = (newColor, y, x, size, ctx) => {
    ctx.fillStyle = newColor;
    ctx.fillRect(x, y, size, size);
  }

  hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  getCoordinates = (x,y, size, canvasSize) => {
    const temp = canvasSize / (512 * size);
    const X = Math.floor(temp * x) * size;
    const Y = Math.floor(temp * y) * size;
    return [ X, Y ];
  }

  draw = (e, color, pixelFill, getCoordinates) => {
    if (!this.isDrawing) return;
    const ctx = this.canvas.current.getContext('2d');
    if (this.props.activeTool === 5) {
      ctx.putImageData(this.imageData, 0, 0);
    }
    const { canvasSize, activeSize } = this.props;
    const [ x, y ] = getCoordinates(e.nativeEvent.offsetX, e.nativeEvent.offsetY, activeSize, canvasSize);
    let [ X, Y ] = [ this.lastX, this.lastY ];
    const [ dx, dy ] = [ Math.abs(x - X), Math.abs(y - Y) ];
    const sx = (X < x) ? activeSize : -activeSize;
    const sy = (Y < y) ? activeSize : -activeSize;
    let err = dx - dy;

    while (true && X >= 0 && X < canvasSize && Y >= 0 && Y < canvasSize) {
      pixelFill(color, Y, X, activeSize, ctx);
      if ((X === x) && (Y === y)) break;
      const e2 = 2 * err;
      if (e2 > -dy) { 
        err -= dy;
        X += sx;
      }
      if (e2 < dx) { 
        err += dx; 
        Y += sy;
      }
    }
    if (this.props.activeTool !== 5) {
      [ this.lastX,  this.lastY ] = [ X, Y ];
    }
  }

  getRgba = (x, y, ctx) => {
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
  }

  fill = (x, y, color, getRgba, pixelFill) => {
    const ctx = this.canvas.current.getContext('2d');
    const stack = [[x, y]];
    const pixelColor = getRgba(x, y, ctx);
    let { canvasSize } = this.props;
    let pixel;

    if (pixelColor === color) return;
    while (stack.length > 0) {
      pixel = stack.pop();
      if (pixel[0] < 0 || pixel[0] >= canvasSize) continue;
      if (pixel[1] < 0 || pixel[1] >= canvasSize) continue;

      if (getRgba(pixel[0], pixel[1], ctx) === pixelColor) {

        pixelFill(color, pixel[1], pixel[0], 1, ctx);
        stack.push([
          pixel[0] - 1,
          pixel[1],
        ]);
        stack.push([
          pixel[0] + 1,
          pixel[1],
        ]);
        stack.push([
          pixel[0],
          pixel[1] - 1,
        ]);
        stack.push([
          pixel[0],
          pixel[1] + 1,
        ]);
      }
    }
  }

  fillAllPixelsOfTheSameColor = (x, y, color) => {
    const ctx = this.canvas.current.getContext('2d');
    const pixelColor = this.getRgba(x, y, ctx);
    let { canvasSize } = this.props;

    if (pixelColor === color) return;
    for(let i = 0; i < canvasSize; i++) {
      for(let j = 0; j < canvasSize; j++) {
        if (this.getRgba(i, j, ctx) === pixelColor) {
          this.pixelFill(color, j, i, 1, ctx);
        }
      }
    }
  }

  canvasSizeSwitcher = (e) => {
    let canvasSize;
    switch (e.target.value) {
      case '10':
        canvasSize = 32;
        break;
      case '20':
        canvasSize = 64;
        break;
      case '30':
        canvasSize = 128;
        break;
      default: break;
    }
    this.updateFrames(canvasSize);
    this.props.canvasSizeChanger(canvasSize);
  };

  handleMouseMove = (e) => {
    const { pixelFill, getCoordinates } = this;
    if(this.props.activeTool === 4) this.draw(e, 'rgb(128, 128, 128)', pixelFill, getCoordinates);
    else if(e.nativeEvent.which === 1) this.draw(e, this.props.colorPrimary, pixelFill, getCoordinates);
    else if(e.nativeEvent.which === 3) this.draw(e, this.props.colorSecondary, pixelFill, getCoordinates);
  }

  handleMouseDown = (e) => {
    const { activeTool, canvasSize } = this.props;
    const ctx = this.canvas.current.getContext('2d');
    if(activeTool === 5) {
      this.imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
    }

    const { offsetX, offsetY } = e.nativeEvent;

     if (activeTool === 1) {
      const [ x, y ] = this.getCoordinates(offsetX, offsetY, 1, canvasSize);
      const pixelColor = this.getRgba(x, y, ctx);

      if(e.nativeEvent.which === 1) this.props.colorPrimaryChanger(pixelColor, true);
      else if(e.nativeEvent.which === 3) this.props.colorSecondaryChanger(pixelColor, true);
    } else if (activeTool === 2 || activeTool === 4 || activeTool === 5) {
      [ this.lastX, this.lastY] = this.getCoordinates(offsetX, offsetY, this.props.activeSize, canvasSize);
      this.isDrawing = true;
    } else if (activeTool === 0) {
      const [ x, y ] = this.getCoordinates(offsetX, offsetY, 1, canvasSize);
      if(e.nativeEvent.which === 1) this.fill(x, y, this.props.colorPrimary, this.getRgba, this.pixelFill);
      else if(e.nativeEvent.which === 3) this.fill(x, y, this.props.colorSecondary, this.getRgba, this.pixelFill);
    } else if (activeTool === 6) {
      const [ x, y ] = this.getCoordinates(offsetX, offsetY, 1, canvasSize);
      if(e.nativeEvent.which === 1) this.fillAllPixelsOfTheSameColor(x, y, this.props.colorPrimary);
      else if(e.nativeEvent.which === 3) this.fillAllPixelsOfTheSameColor(x, y, this.props.colorSecondary);
    }
  }

  handleMouseUp = (e) => {
    this.isDrawing = false;
    if(this.props.activeTool !== 1) {
      this.updateActiveFrame();
    }
  }

  handleMouseOut = (e) => {
    const { pixelFill, getCoordinates } = this;
    if (this.isDrawing) {
      if(this.props.activeTool === 4) this.draw(e, 'rgb(128, 128, 128)', pixelFill, getCoordinates);
      else if(e.nativeEvent.which === 1) this.draw(e, this.props.colorPrimary, pixelFill, getCoordinates);
      else if(e.nativeEvent.which === 3) this.draw(e, this.props.colorSecondary, pixelFill, getCoordinates);
      this.isDrawing = false;
      this.updateActiveFrame();
    }
  }

  render() {
    let { canvasSize } = this.props;
    return (<div className = "main__canvas-container">
            <canvas  id = "canvas" ref = {this.canvas} className = "main__canvas" width = {canvasSize} height = {canvasSize}
              onMouseMove = {this.handleMouseMove}
              onMouseDown = {this.handleMouseDown}
              onMouseUp = {this.handleMouseUp}
              onMouseOut = {this.handleMouseOut}
              data-testid="canvas"
            ></canvas>
            <input onInput = {this.canvasSizeSwitcher} id = "size-switcher" className = "main__size-input" type = "range" name = "canvasSize" min = "10" max = "30" defaultValue = "10" step = "10" />
            <label data-testid = "label" id = "size-switcher-label" className = "main__size-label" htmlFor = "canvasSize">{canvasSize}&times;{canvasSize}</label>
          </div>);
  }
}

export default CanvasElementCreater;
