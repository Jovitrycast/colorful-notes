import { generateRandomId } from '../commons/functions';

// Import note reducers // redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notes from './Notes';

function NoteLists() {
    const dispatch = useDispatch();
    const { notes, addNew, noteColor, createdAt } = useSelector((state) => state.note);
    const [listedNotes, setListedNotes] = useState(notes);

    useEffect(() => {
      if(addNew){
        handleAddNote(noteColor)
      }
      },[addNew])

     const handleAddNote = (color) => {
        const noteId = generateRandomId();

        setListedNotes((prev) => [
          {
            id: noteId,
            content: "",
            color: noteColor,
            createdAt: createdAt
          },
          ...prev,
        ]);

        console.log(listedNotes);
      }

  return (
    <div className='d-flex'>
        {listedNotes?.map((note) => (
            <div key={note} className="w-25">
                <Notes noteData={note} />
            </div>
        ))}
    </div>
  )
}

export default NoteLists