import { createSlice } from '@reduxjs/toolkit';
import { Note, Notes } from 'interfaces/types';
import initialData from 'public/data/notes.json';

export interface NotesState {
  value: Notes;
  status: string | null;
  selected: Note | null;
}

const total = initialData.notes?.length || 0;

const initialState: NotesState = {
  value: {
    items: initialData.notes,
    total,
  },
  selected: null,
  status: null,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    updateSelected: (state, action) => {
      if (state.selected) {
        state.selected = {
          ...state.selected,
          ...action.payload,
        };
      }
    },
    updateNote: (state, action) => {
      state.value.items = state.value.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }

        return item;
      });
    },

    addNote: (state) => {
      state.value.items.unshift({
        id: 'my-new-note-' + new Date().getTime(),
        title: 'Untitled note',
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },

    deleteNote: (state, action) => {
      console.log(action.payload);
      state.value.items = state.value.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setSelected, updateSelected, updateNote, addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
