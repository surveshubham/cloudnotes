import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  let atoken = localStorage.getItem('token');
  console.log(atoken);

  //fetch all notes from database
  const getnotes = async () => {
    //api call
    
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": atoken,
      },
    });
    const json = await response.json();
    setnotes(json);
  };



  //add a note
  const addnotes = async (title, description) => {
    //api call
    const response = await fetch(`${host}/api/notes/createnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": atoken
      },
      body: JSON.stringify({ title, description })
    });

    const note = await response.json();
    setnotes(notes.concat(note));
  };



  //delete a note 
  const deletenotes = async (id) => {
    console.log("deleting the note with id" + id);

    //API FOR DELETING THE NOTES FROM THE DATABASE 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": atoken
      },

    });
    const newnotes = notes.filter((notes) => { return notes._id !== id })
    setnotes(newnotes);
  }


  //edit a note 
  const editnotes = async (id, title, description) => {

    //api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": atoken
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));

    //creating logic to edit a selected notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setnotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, setnotes, addnotes, deletenotes, editnotes, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;