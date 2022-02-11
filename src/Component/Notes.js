import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/NoteContext'
import Noteitem from './Noteitem';
import Addnotes from './Addnotes'
import { useHistory } from 'react-router';

const Notes = () => {
    let history =useHistory();
    const context = useContext(NoteContext);
    const { notes, getnotes , editnotes } = context;

    //usin useEffect to call the api and fetch all the notes.
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnotes();  //use this function to fetch the notes from database
        }else{
            history.push("/Login");
        }
    }, [])

    //edit a notes
    const ref = useRef(null)
    const refClose = useRef(null)

    //using useState to edit the notes
    const [note, setNote] = useState({id: "", etitle: "", edescription: ""})

    const updatenotes = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
    }

    const handleClick = (e)=>{ 
        console.log("updating the notes" , note)
        editnotes(note.id, note.etitle, note.edescription)
        refClose.current.click();
        e.preventDefault()
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <>
            <Addnotes />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* from here starts the notes item */}
            <div className="row my-3">
                <h3>YOUR NOTES</h3>
                {notes.map((notes, index) => {
                    return <Noteitem key={notes._id} updatenotes={updatenotes} notes={notes} index={index} /> //you can directly create noteitem here but i have used component 
                })}
            </div>
        </>
    )
}

export default Notes
