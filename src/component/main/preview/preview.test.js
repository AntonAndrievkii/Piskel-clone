import React from 'react';
import {mount} from 'enzyme';
import Preview from './preview';

describe('renders', () => {
  it('renders ToolsElementCreter without crashing', () => {
    mount(<Preview frames = {[{image: null}]} canvasSize = {32} />);
  });
});
