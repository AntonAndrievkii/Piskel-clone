import React, { PureComponent } from "react";
import Size from './size/size';
import './pencilSizeBlock.css';

const sizes = [1, 2, 3, 4];

class PenSizes extends PureComponent {
  render() {
    const { activeSize, sizeSwitcher } = this.props;
    return (<ul className="pen-sizes">
              {sizes.map((el, idx) => <Size
                active={activeSize === idx + 1} 
                el = {el}
                key = {idx}
                handleClick = {sizeSwitcher.bind(this, idx + 1)}
              />)}
            </ul>);
  }
}

export default PenSizes;