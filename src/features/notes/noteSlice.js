import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get notes from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

// Set Date 
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


const initialState = {
    listedNotes: notes ? notes : [],
    isEmpty: true,
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
            let updatedNotes = state.listedNotes
            updatedNotes[state.listedNotes.findIndex(note => note.id === action.payload.id)] = action.payload; 
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            state.addNew = false;
        },
        setListedNotes: (state, action) => {
            state.listedNotes.unshift(action.payload)
        }
    }
});

export const {
        reset, 
        SaveChanges,
        createNewNote,
        setListedNotes,

    } = noteSlice.actions
export default noteSlice.reducer