import React, {Component} from 'react';
import Rnd from 'react-rnd';

class Canvas extends Component {
  render() {
    const {
      rectangles,
      updateRectangle,
      editRectangle,
      editingRectangle,
      deleteRectangle
    } = this.props;
    console.log(editingRectangle)
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
              border: editingRectangle === i ? '3px solid green': '3px dashed #fff',
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
          <div
            style={{
              width: '80%',
              height: '22px',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto',
              textAlign: 'center'
            }}>
            <i className="fas fa-long-arrow-alt-left"/>&nbsp;
            Add some rectangles
          </div>
        }
      </div>
    )
  }
}

export default Canvas;
