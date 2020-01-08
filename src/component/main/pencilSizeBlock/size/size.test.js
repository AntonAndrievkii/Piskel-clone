import React from 'react';
import {mount} from 'enzyme';
import Size from './size';

describe('renders', () => {
  it('renders ToolsElementCreter without crashing', () => {
    mount(<Size el = {'1'}  handleClick  ={() => {}} active = {false}/>);
  });
});
