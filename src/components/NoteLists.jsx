import { generateRandomId } from '../commons/functions';

// Import note reducers // redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListedNotes } from '../features/notes/noteSlice';
import Notes from './Notes';

function NoteLists() {
    const dispatch = useDispatch();
    const { listedNotes, addNew, createdAt} = useSelector((state) => state.note);
    const [displayedNotes, setDisplayedNotes] = useState(listedNotes);

    useEffect(() => {
      if(addNew){
        handleAddNote();
      }
      },[addNew])

    useEffect(() => {
      setDisplayedNotes(listedNotes)
      },[listedNotes])

     const handleAddNote = () => {
        const noteId = generateRandomId();

        const newNote = {
            id: noteId,
            content: "",
            date: createdAt,
            isOpen: true
          }
          dispatch(setListedNotes(newNote));
      }


  return (
    <div className='d-flex flex-wrap'>
        {displayedNotes?.map((note) => (
            <div key={note.id} className="w-25">
                <Notes 
                  noteData={note}
                />
            </div>
        ))}
    </div>
  )
}

export default NoteLists