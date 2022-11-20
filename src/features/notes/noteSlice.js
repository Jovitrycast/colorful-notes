import { createSlice } from '@reduxjs/toolkit';

// Get notes from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

// Set Date 
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


const initialState = {
    listedNotes: notes ? notes : [],
    addNew: false,
    noteColor: "",
    createdAt: currentDate.toLocaleDateString('en-us', options),
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
        createNewNote: (state, action) => {
            state.addNew = true;
            state.noteColor = action.payload;
        },
        SaveChanges: (state, action) => {
            state.listedNotes[state.listedNotes.findIndex(note => note.id === action.payload.id)] = action.payload; 
            localStorage.setItem('notes', JSON.stringify(state.listedNotes));
            state.addNew = false;
            state.noteColor = "";
        },
        updateNoteColor: (state, action) => {
            const {id, color} = action.payload
            state.listedNotes[state.listedNotes.findIndex(note => note.id === id)].color = color; 
            localStorage.setItem('notes', JSON.stringify(state.listedNotes));
        },
        setListedNotes: (state, action) => {
            state.listedNotes.unshift(action.payload)
        },
        deleteNote: (state, action) => {
            let thisNote = state.listedNotes.findIndex(note => note.id === action.payload)
            state.listedNotes.splice(thisNote,1);
            localStorage.setItem('notes', JSON.stringify(state.listedNotes));
        },
        discard: (state) => {
            const notes = JSON.parse(localStorage.getItem('notes'));
            state.listedNotes = notes;
            state.noteColor = "";
            state.addNew = false;
        }
    }
});

export const {
        reset, 
        SaveChanges,
        createNewNote,
        setListedNotes,
        deleteNote,
        updateNoteColor,
        discard

    } = noteSlice.actions
export default noteSlice.reducer