import React, { useContext, useState } from 'react'
import NoteContext from '../Context/NoteContext'

const Addnotes = () => {
    const context = useContext(NoteContext);
    const { addnotes } = context;

    const [notes, setnotes] = useState({
        title: "",
        description: "",
    });

    const handleclick = (e) => {
        e.preventDefault();
        // console.log(notes);
        addnotes(notes.title, notes.description);
        setnotes({ title: "", description: "" })
    }

    const onChange = (e) => {
        setnotes({ ...notes, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h3>ADD A NOTE</h3>

            <form>
            
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={notes.title} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" value={notes.description} onChange={onChange} />
                </div>

                <button disabled={notes.title.length < 5 || notes.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick} >Submit</button>

            </form>
        </div>
    )
}

export default Addnotes;
