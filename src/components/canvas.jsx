import React, {Component} from 'react';
import Rnd from 'react-rnd';

class Canvas extends Component {
  render() {
    const {rectangles, updateRectangle} = this.props;
    return (
      <div
        id="canvas">
        {rectangles && rectangles.length ? rectangles.map((rectangle, i) => (
          <Rnd
            onResize={(e, direction, ref, delta, position) => (
              updateRectangle(i, {
                width: ref.clientWidth,
                height: ref.clientHeight,
                x: position.x,
                y: position.y
              })
            )}
            onDragStop={(e, d) => (
              updateRectangle(i, {
                width: rectangle.width,
                height: rectangle.height,
                x: d.x,
                y: d.y
              })
            )}
            size={{
              width: rectangle.width,
              height: rectangle.height
            }}
            position={{x: rectangle.x, y: rectangle.y}}
            style={{
              position: 'absolute',
              backgroundColor: rectangle.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255, 0.5)'
            }}>
          </Rnd>
        ))
        :
          null
        }
      </div>
    )
  }
}

export default Canvas;
