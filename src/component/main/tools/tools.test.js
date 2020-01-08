import React from 'react';
import {mount} from 'enzyme';
import ToolsElementCreter from './tools';

describe('renders', () => {
  it('renders ToolsElementCreter without crashing', () => {
    mount(<ToolsElementCreter canvasCleaner = {() => {}} toolSwitcher = {() => {}} activeTool = {1} />);
  });
});
