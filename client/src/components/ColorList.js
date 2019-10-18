import React, { useState } from 'react';
import {axiosWithAuth} from './../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  //stretch adding colors
  const [colorAdd, setColorAdd] = useState(false);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = event => {
    event.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
  
      .then(response => 
        updateColors(colors.map(color => {
          return color.id === colorToEdit.id ? colorToEdit : color;
          })
        )
      )

      .catch(error => console.log(error.response));
  };


  const deleteColor = (color, event) => {
    // make a delete request to delete this color
    event.stopPropagation();

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)

      .then(response => {
        updateColors(colors.filter(item => item.id !== color.id));
        return color.id === colorToEdit.id ? setEditing(false) : null;
      })

      .catch(error => console.log(error.response));
  };

  //stretch adding a color
  const addNewColor = event => {
    event.preventDefault();

      axiosWithAuth()
        .post(`http://localhost:5000/api/colors`, colorAdd)

        .then(response => {
          updateColors([...colors, colorAdd]);
          setColorAdd(initialColor);
        })

        .catch(error => console.log(error.response));

  }

  return (
    <div className = 'colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key = {color.color} onClick = {() => editColor(color)}>
            <span>
              <span className = 'delete' onClick = {event => deleteColor(color, event)}>
                x
              </span>{' '}
              {color.color}
            </span>

            <div
              className = 'color-box'
              style = {{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit = {saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange = {event =>
                setColorToEdit({ ...colorToEdit, color: event.target.value })
              }
              value={colorToEdit.color}
            />
          </label>

          <label>
            Hex Code:
            <input
              onChange = {event =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: event.target.value }
                })
              }
              value = {colorToEdit.code.hex}
            />
          </label>

          <div className = 'button-row'>
            <button type = 'submit'>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}


      <div className = 'spacer'/>
      {/* stretch - build another form here to add a color */}
        <form onSubmit={addNewColor}>
            <legend>Add Color</legend>

            <label>
              Color:
              <input
                onChange={event =>
                  setColorAdd({ ...colorAdd, color: event.target.value })
                }
                value={colorAdd.color}
              />
            </label>

            <label>
              Hex Code:
              <input
                onChange = {event =>
                  setColorAdd({
                    ...colorAdd,
                    code: { hex: event.target.value }
                  })
                }
                value = {colorAdd.color}
              />
            </label>

            <div className = 'button-row'>
              <button type = 'submit'>Add Color</button>

            </div>
        </form>
      
    </div>
  );
};

export default ColorList;
