import React from 'react';
import {mount} from 'enzyme';
import { render } from '@testing-library/react';
import CanvasElementCreater from './canvas';

describe('renders', () => {

  it('renders CanvasElementCreater without crashing', () => {
    mount(<CanvasElementCreater frameImgUpdater = {() => {}} />);
  });
  
  it('renders CanvasElementCreater correctly', () => {
    const { getByTestId } = render(<CanvasElementCreater frameImgUpdater = {() => {}} canvasSize = {64} />);
    expect(getByTestId('label')).toHaveTextContent('64×64');
  });

});

describe('methods', () => {
  
  test('hexToRGB function works correctly', () => {
    const canvasElement = mount(<CanvasElementCreater frameImgUpdater = {() => {}} />);
    expect(canvasElement.instance().hexToRGB('#c27979')).toEqual('rgb(194, 121, 121)');
  });

  test('getCoordinates function works correctly', () => {
    const canvasElement = mount(<CanvasElementCreater frameImgUpdater = {() => {}} />);
    expect(canvasElement.instance().getCoordinates(100, 200, 1, 64)).toEqual([12, 25]);
  });

  it('canvasSizeSwitcher works', () => {
    const mockFn = jest.fn();
    const e = {target:{value:30}};
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
      frames = {[]}
      canvasSizeChanger = {mockFn} 
    />);
    canvasElement.instance().canvasSizeSwitcher(e);
    expect(mockFn).toHaveBeenCalled();
  });

  it('fill works', () => {
    const mockFn = jest.fn(() => 'rgb(19, 151, 129)');
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
    />);
    canvasElement.instance().fill(10, 20, 'rgb(19, 151, 129)', mockFn, mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  it('fillAllPixelsOfTheSameColor works', () => {
    const mockFn = jest.fn(() => 'rgb(19, 151, 129)');
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
      activeTool = {2}
      canvasSizeChanger = {() => {}} 
    />);
    canvasElement.instance().getRgba = mockFn;
    canvasElement.instance().fillAllPixelsOfTheSameColor(20, 10, 'rgb(19, 151, 129)');
    expect(mockFn).toHaveBeenCalled();
  });
  
  it('updateActiveFrame works', () => {
    const mockFn = jest.fn();
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {mockFn} 
      canvasSize = {64}
      canvasSizeChanger = {() => {}} 
    />);
    canvasElement.instance().updateActiveFrame();
    expect(mockFn).toHaveBeenCalled();
  });

  it('handleMouseUp works', () => {
    const mockFn = jest.fn();
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {mockFn} 
      canvasSize = {64}
      activeTool = {2}
      canvasSizeChanger = {() => {}} 
    />);
    canvasElement.instance().handleMouseUp();
    expect(mockFn).toHaveBeenCalled();
  });

  it('handleMouseOut works', () => {
    const mockFn = jest.fn();
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
      activeTool = {2}
      canvasSizeChanger = {() => {}} 
    />);
    canvasElement.instance().isDrawing = true;
    canvasElement.instance().draw = mockFn;
    canvasElement.instance().handleMouseOut({nativeEvent: {which: 1}});
    expect(mockFn).toHaveBeenCalled();
  });

  it('handleMouseDown works', () => {
    const mockFn = jest.fn(() => [ 32, 32]);
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
      activeTool = {6}
      canvasSizeChanger = {() => {}} 
    />);
    canvasElement.instance().isDrawing = true;
    canvasElement.instance().fillAllPixelsOfTheSameColor = mockFn;
    canvasElement.instance().getCoordinates = mockFn;
    canvasElement.instance().handleMouseDown({nativeEvent: {which: 1, offsetX: 32, offsetY: 32}});
    expect(mockFn).toHaveBeenCalled();
  });

  it('handleMouseMove works', () => {
    const mockFn = jest.fn(() => [ 32, 32]);
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
      activeTool = {4}
    />);
    canvasElement.instance().isDrawing = true;
    canvasElement.instance().draw = mockFn;
    canvasElement.instance().handleMouseMove();
    expect(mockFn).toHaveBeenCalled();
  });

  it('draw works', () => {
    const mockFn = jest.fn(() => [ 32, 32 ]);
    const canvasElement = mount(<CanvasElementCreater
      frameImgUpdater = {() => {}} 
      canvasSize = {64}
      activeTool = {2}
      canvasSizeChanger = {() => {}} 
    />);
    canvasElement.instance().isDrawing = true;
    canvasElement.instance().draw({nativeEvent: {offsetX: 32, offsetY: 32}}, 'rgb(182, 177, 177)', mockFn, mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

});
