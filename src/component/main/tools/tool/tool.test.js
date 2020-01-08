import React from 'react';
import {mount} from 'enzyme';
import Tool from './/tool';

describe('renders', () => {
  it('renders ToolsElementCreter without crashing', () => {
    mount(<Tool el = {'1'}  handleClick  ={() => {}} active = {false}/>);
  });
});