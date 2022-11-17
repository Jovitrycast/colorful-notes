// Import note reducers // redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notes from './Notes';

function NoteLists() {
    const dispatch = useDispatch();
    const { notes, isAddNew, content,  noteColor, createdAt } = useSelector((state) => state.note);
    
  return (
    <div className='d-flex'>
        {notes?.map((note) => (
            <div key={note} className="w-25">
                <Notes noteData={note} />
            </div>
        ))}
    </div>
  )
}

export default NoteLists