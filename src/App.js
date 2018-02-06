import React, { Component } from 'react';
import Canvas from './components/canvas';
import { BlockPicker } from 'react-color';

class App extends Component {
  state = {
    startingWidth: 100,
    startingHeight: 70,
    color: 'orange',
    layoutName: '',
    rectangles: [],
    savedLayouts: [],
    showColorPicker: false,
    editingLayout: false,
    nameInvalid: false
  }

  componentWillMount() {
    if (localStorage.getItem('layout')) {
      this.setState({
        rectangles: JSON.parse(localStorage.getItem('layout'))
      })
    }

    if (localStorage.getItem('layouts')) {
      this.setState({
        savedLayouts: JSON.parse(localStorage.getItem('layouts'))
      })
    }
  }

  handleColorChange = (color) => {
    this.setState({
      color: color.hex,
      showColorPicker: false
    });
  };

  _clearCanvas = () => {
    this.setState({
      rectangles: []
    })
    localStorage.removeItem('layout');
  }

  _saveCanvas = () => {
    const {rectangles, savedLayouts, layoutName} = this.state;
    if (!layoutName) {
      return this.setState({
        nameInvalid: true
      })
    }

    let layouts = savedLayouts
    let layout = Object.assign({}, {layout: rectangles}, {name: layoutName})
    layouts.push(layout)
    this.setState({
      savedLayouts: layouts,
      rectangles: [],
      layoutName: ''
    })

    localStorage.setItem("layouts", JSON.stringify(layouts))
  }

  updateRectangle = (index, payload) => {
    let rectangles = this.state.rectangles;
    let oldRectangle = this.state.rectangles[index]
    rectangles.splice(index, 1, {
      color: oldRectangle.color,
      height: payload.height,
      width: payload.width,
      x: payload.x,
      y: payload.y
    })

    this.setState({
      rectangles: rectangles
    })

    localStorage.setItem('layout', JSON.stringify(rectangles))

  }

  _createRectangle = () => {
    const {rectangles, startingHeight, startingWidth, color, x, y} = this.state;
    let newRectangles = rectangles
    newRectangles.splice(0,0, {
      width: startingWidth,
      height: startingHeight,
      color: color,
      x: Math.random() * (x-startingWidth),
      y: Math.random() * (y - startingHeight)
    })
    this.setState({
      rectangles: newRectangles
    })
  }

  editRectangle = (index) => {
    console.log(index)
  }

  deleteRectangle = (index) => {
    let newRectangles = this.state.rectangles;
    newRectangles.splice(index, 1)
    this.setState({
      rectangles: newRectangles
    })
  }
  _toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    })
  }

  _handleNameChange = (value) => {
    this.setState({
      layoutName: value
    })
  }

  _deleteLayout = (index) => {
    const {savedLayouts} = this.state;
    let layouts = savedLayouts
    layouts.splice(index, 1)
    this.setState({
      savedLayouts: layouts
    })
    localStorage.setItem('layouts', JSON.stringify(layouts))
  }

  _selectLayout = (index) => {
    let selectedLayout = this.state.savedLayouts[index]

    this.setState({
      rectangles: selectedLayout.layout,
      editing: true
    })
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas')
    this.setState({
      y: canvas.clientHeight,
      x: canvas.clientWidth
    });
  }

  render() {
    const {
      rectangles,
      color,
      savedLayouts,
      nameInvalid
    } = this.state;


    return (
      <div className="App">
        <div id="main-content">
          <div id="rect-builder">
            {/* <p id="rect-builder-description">
              Choose a color and add it to the canvas. Once added, you can&nbsp;
              change size and position as you please!
            </p> */}
            <div
              style={{
                backgroundColor: color
              }}
              id="rectangle-preview">
                <button
                  onClick={() => this._toggleColorPicker()}
                  className="btn-outline">change color</button>
              </div>
              {this.state.showColorPicker ?
                <BlockPicker
                  color={this.state.color}
                  onChangeComplete={this.handleColorChange}
                />
              :
                null
              }
              <button
                id="add-to-canvas-button"
                onClick={() => this._createRectangle()}>
                <i className="fas fa-plus"/>&nbsp;
                Add Rectangle
              </button>

              <button
                id="clear-canvas"
                onClick={() => this._clearCanvas()}>
                <i className="fas fa-recycle"/>&nbsp;
                Clear Canvas
              </button>
          </div>

          <Canvas
            deleteRectangle={this.deleteRectangle}
            editRectangle={this.editRectangle}
            updateRectangle={this.updateRectangle}
            rectangles={rectangles} />

          <div id="saved-layouts">
            <div id="save-layout-form">
              <input
                style={nameInvalid ? {border: '1px solid red', color: 'red'} : null}
                placeholder='Name your layout'
                value={this.state.layoutName}
                onChange={(e) => this._handleNameChange(e.target.value)}
                type="text"/>
              <button
                onClick={() => this._saveCanvas()}>
                Save
              </button>
            </div>
            <ul id="layout-list">
              <h4>My Layouts</h4>
              {savedLayouts.length ? savedLayouts.map((layout, i) => (
                <li
                  key={i}
                  className="saved-layouts-list-item">
                  <a
                    key={i}
                    className="select-layout"
                    role="button"
                    onClick={() => this._selectLayout(i)}>
                    {layout.name}
                  </a>
                  <a
                    className="delete-layout"
                    onClick={() => this._deleteLayout(i)}
                    role="button">
                    <i className="fas fa-times"/>
                  </a>
                </li>
              ))
              :
                null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
