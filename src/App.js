import React, { Component } from 'react';
import Canvas from './components/canvas';
import Builder from './components/builder';
import SavedLayouts from './components/saved-layouts';

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
    editingRectangle: null,
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
    let editingRectangle = this.state.editingRectangle;
    if (this.state.editingRectangle != null) {
      let rectangle = this.state.rectangles[editingRectangle]
      rectangle.color = color.hex
    }
    this.setState({
      color: color.hex,
      showColorPicker: false,
      editingRectangle: null
    });
  };

  clearCanvas = () => {
    this.setState({
      rectangles: []
    })
    localStorage.removeItem('layout');
  }

  saveCanvas = () => {
    const {
      rectangles,
      layoutName,
      editingLayout,
      savedLayouts
    } = this.state;

    if (!layoutName) {
      return this.setState({
        nameInvalid: true
      })
    }

    let newLayouts = savedLayouts
    let newLayout = Object.assign({}, {layout: rectangles}, {name: layoutName})

    if (editingLayout != null) {
      newLayouts.splice(editingLayout, 1, newLayout)
    } else {
      newLayouts.push(newLayout)
    }

    this.setState({
      rectangles: [],
      layoutName: ''
    });

    localStorage.setItem("layouts", JSON.stringify(newLayouts))
    localStorage.removeItem("layout")
  }

  createRectangle = () => {
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

    localStorage.setItem('layout', JSON.stringify(newRectangles))
  }

  toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    })
  }

  handleNameChange = (value) => {
    this.setState({
      layoutName: value,
      nameInvalid: !value.length
    })
  }

  deleteLayout = (index) => {
    const {savedLayouts} = this.state;
    let layouts = savedLayouts
    layouts.splice(index, 1)
    this.setState({
      savedLayouts: layouts
    })
    localStorage.setItem('layouts', JSON.stringify(layouts))
  }

  selectLayout = (index) => {
    let selectedLayout = this.state.savedLayouts[index]

    this.setState({
      rectangles: selectedLayout.layout,
      editingLayout: index,
      layoutName: selectedLayout.name
    })
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

  editRectangle = (index) => {
    let rectangle = this.state.rectangles[index];
    this.setState({
      showColorPicker: true,
      color: rectangle.color,
      editingRectangle: index
    })
  }

  duplicateLayout = (layout) => {
    this.state.savedLayouts.push({
      layout: layout.layout,
      name: `${layout.name} copy`
    })
    this.selectLayout(this.state.savedLayouts.length - 1)

    localStorage.setItem('layout', JSON.stringify(layout.layout))
    localStorage.setItem('layouts', JSON.stringify(this.state.savedLayouts))
  }

  deleteRectangle = (index) => {
    let newRectangles = this.state.rectangles;
    newRectangles.splice(index, 1)
    this.setState({
      rectangles: newRectangles
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
      nameInvalid,
      showColorPicker,
      layoutName,
      editingLayout
    } = this.state;


    return (
      <div className="App">
        <div id="main-content">
          <Builder
            color={color}
            toggleColorPicker={this.toggleColorPicker}
            showColorPicker={showColorPicker}
            handleColorChange={this.handleColorChange}
            createRectangle={this.createRectangle}
            clearCanvas={this.clearCanvas} />

          <Canvas
            deleteRectangle={this.deleteRectangle}
            editRectangle={this.editRectangle}
            editingRectangle={this.state.editingRectangle}
            updateRectangle={this.updateRectangle}
            rectangles={rectangles} />

          <SavedLayouts
            duplicateLayout={this.duplicateLayout}
            nameInvalid={nameInvalid}
            layoutName={layoutName}
            handleNameChange={this.handleNameChange}
            saveCanvas={this.saveCanvas}
            savedLayouts={savedLayouts}
            selectLayout={this.selectLayout}
            deleteLayout={this.deleteLayout}
            editingLayout={editingLayout}/>
        </div>
        <a
          id="download-button"
          href="/images/myw3schoolsimage.jpg"
          download>
          Download App
        </a>
      </div>
    );
  }
}

export default App;
