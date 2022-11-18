import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get notes from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

// Set Date 
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


const initialState = {
    notes: notes ? notes : [],
    isEmpty: true,
    addNew: false,
    content: "",
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
        openNote: (state, action) => {
            state.noteColor = action.payload;
        },
        addNote: (state, action) => {
            localStorage.setItem('notes', JSON.stringify(state.notes));
        }
    }
});

export const {reset, addNote, openNote, createNewNote} = noteSlice.actions
export default noteSlice.reducer