import React, { PureComponent } from "react";
import Example from "./example/example";
import './examples.css';

const examples = [
  'assets/rainbow.gif',
  'assets/flash.gif',
  'assets/rs.gif',
  'assets/smile.gif'
]

class Examples extends PureComponent {
  render() {
    return (<div className = "examples-block">
        <h2 className = "examples-block__headline">Examples</h2>
        <ul className = "examples-block__examples">
          {examples.map((el, idx) => 
            <Example img = {el} key = {idx}/>
          )}
        </ul>
    </div>);
  }
}

export default Examples;