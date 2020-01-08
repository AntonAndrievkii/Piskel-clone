import React, { PureComponent } from "react";
import Color from './color/color';
import './colors.css';

const colors = [
  {
    id: 'color-active',
    htmlFor: 'color-active',
    text: 'Primary color',
  },
  {
    id: 'color-prev',
    htmlFor: 'color-prev',
    text: 'Secondary color',
  }
  ];

class ColorsElementCreter extends PureComponent {
  render() {
    const { colorSecondary, colorPrimary, colorSecondaryChanger, colorPrimaryChanger } = this.props;
    return (<ul className="colors">
            {colors.map((el, idx) => <Color 
            key = {idx}
            el = {el}
            color = {(idx === 0) ? colorPrimary : colorSecondary}
            colorChanger = {(idx === 0) ? colorPrimaryChanger.bind(this) : colorSecondaryChanger.bind(this)}
            />)}
        </ul>);
  }
}

export default ColorsElementCreter;
