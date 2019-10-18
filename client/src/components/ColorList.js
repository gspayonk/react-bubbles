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
  const [adding, setAdd] = useState(false);
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
  
      .then(response => {
        const updatedList = colors.map(color => {
          if(color.id === colorToEdit.id) {
            return response.data
          } else {
            return color
          }
        })
        updateColors(updatedList);
      })

      .catch(error => console.log(error.response));
    setEditing(false);
  };


  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)

      .then(response => {
        const updatedList = colors.filter(item => item.id !== color.id);
        return color.id === colorToEdit.id ? setEditing(false) : null;
        // updateColors(updatedList);
      })

      .catch(error => console.log(error.response));
  };

  //stretch adding a color
  const addNewColor = event => {
    event.preventDefault();

    if (colorAdd.color !== '' && colorAdd.code.hex !== '') {

      axiosWithAuth()
        .post(`http://localhost:5000/api/colors`, colorAdd)

        .then(response => {
          updateColors([...colors, colorAdd]);
          setColorAdd(initialColor);
        })

        .catch(error => console.log(error.response));
    }
  }

  return (
    <div className = 'colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key = {color.color} onClick={() => { if (adding) setAdd(false); editColor(color)}}>
            <span>
              <span className = 'delete' onClick={() => deleteColor(color)}>
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
      <button onClick={() => {if (editing) setEditing(false); setAdd(true)}}>Add Color</button>

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
            <button onClick={() => setEditing(false)}>Cancel Add</button>
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
              <button onClick={() => setAdd(false)}>Cancel Add</button>
            </div>
        </form>
      
    </div>
  );
};

export default ColorList;
