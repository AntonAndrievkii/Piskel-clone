import React from 'react';
import {mount} from 'enzyme';
import Frame from './frame';

describe('renders', () => {

  it('renders Frame without crashing', () => {
    mount(<Frame 
        frameChanger = {() => {}} 
        active = {true} 
        framesDelete = {() => {}}
        canvasSize = {32}
        framesDuplicate = {() => {}} />);
  });
});