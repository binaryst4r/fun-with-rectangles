import React, {Component} from 'react';

export class SavedLayouts extends Component {
  render() {
    const {
      nameInvalid,
      layoutName,
      handleNameChange,
      saveCanvas,
      savedLayouts,
      selectLayout,
      deleteLayout,
      editingLayout
    } = this.props;

    return (
      <div id="saved-layouts">
        <div id="save-layout-form">
          <input
            style={nameInvalid ? {border: '1px solid red', color: 'red'} : null}
            placeholder='Name your layout'
            value={layoutName}
            onChange={(e) => handleNameChange(e.target.value)}
            type="text"/>
          <button
            onClick={() => saveCanvas()}>
            Save
          </button>
        </div>
        <ul id="layout-list">
          <h4>
            {editingLayout ? `Editing ${layoutName}` : 'My Layouts'}
          </h4>
          {savedLayouts.length ? savedLayouts.map((layout, i) => (
            <li
              key={i}
              className="saved-layouts-list-item">
              <a
                key={i}
                className="select-layout"
                role="button"
                onClick={() => selectLayout(i)}>
                {layout.name}
              </a>
              <a
                className="delete-layout"
                onClick={() => deleteLayout(i)}
                role="button">
                <i className="fas fa-times"/>
              </a>
            </li>
          ))
          :
            <p>
              <small>
                You currently have no layouts saved.
              </small>
            </p>
          }
        </ul>
      </div>
    )
  }
}

export default SavedLayouts
