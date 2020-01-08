import React from 'react';
import {mount} from 'enzyme';
import Color from './color';

describe('renders', () => {
  it('renders ToolsElementCreter without crashing', () => {
    mount(<Color el = {{id: 1, text: '',htmlFor: '1'}}  colorChanger  ={() => {}} color = {'rgba(0, 0, 0, 0.541327)'}/>);
  });
});
