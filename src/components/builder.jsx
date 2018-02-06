import React, {Component} from 'react';
import { BlockPicker } from 'react-color';

export class Builder extends Component {
  render() {
    const {
      color,
      toggleColorPicker,
      showColorPicker,
      handleColorChange,
      createRectangle,
      clearCanvas
    } = this.props;

    return (
      <div id="rect-builder">
        <div
          style={{
            backgroundColor: color
          }}
          id="rectangle-preview">
            <button
              onClick={() => toggleColorPicker()}
              className="btn-outline">
              change color
            </button>
          </div>
          {showColorPicker ?
            <BlockPicker
              color={color}
              onChangeComplete={handleColorChange}
            />
          :
            null
          }
          <button
            id="add-to-canvas-button"
            onClick={() => createRectangle()}>
            <i className="fas fa-plus"/>&nbsp;
            Add Rectangle
          </button>

          <button
            id="clear-canvas"
            onClick={() => clearCanvas()}>
            <i className="fas fa-recycle"/>&nbsp;
            Clear Canvas
          </button>
      </div>
    )
  }
}

export default Builder;
