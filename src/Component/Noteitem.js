import React, { useContext } from 'react'
import NoteContext from '../Context/NoteContext'

const Noteitem = (props) => {

    const context = useContext(NoteContext);
    const { deletenotes } = context; //using deletenotes functions
    const { notes, index , updatenotes } = props; //passed props from notes.js

    return (
        <div className="col-md-3">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Note {index + 1}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{notes.title}

                        {/* creating a delete button */}
                        <i className="fas fa-trash-alt mx-2" onClick={() => {deletenotes(notes._id);}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updatenotes(notes)}}></i>
                       
                    </h6>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
