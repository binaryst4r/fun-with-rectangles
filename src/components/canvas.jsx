import React, {Component} from 'react';
import Rnd from 'react-rnd';

class Canvas extends Component {
  render() {
    const {
      rectangles,
      updateRectangle,
      editRectangle,
      deleteRectangle
    } = this.props;

    return (
      <div
        id="canvas">
        {rectangles && rectangles.length ? rectangles.map((rectangle, i) => (
          <Rnd
            key={i}
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
              border: `2px dashed #fff`,
              borderPosition: 'inset',
              fontSize: '14px',
              position: 'absolute',
              backgroundColor: rectangle.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255, 0.5)'
            }}>
            <a
              alt="hey"
              className="edit-rectangle"
              onClick={() => editRectangle(i)}
              role="button">
              <i className="fas fa-edit"/>
            </a>

            <a
              className="delete-rectangle"
              onClick={() => deleteRectangle(i)}
              role="button">
              <i className="fas fa-times"/>
            </a>
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
