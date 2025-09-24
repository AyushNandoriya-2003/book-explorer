import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface initialState {
    favouriteBooks: any[];
}

const initialState: initialState = { favouriteBooks: [] };

const favoritesSlice = createSlice({
    name: 'favouriteBooks',
    initialState,
    reducers: {
        addFavouriteBook(state, action: PayloadAction<any>) {
            state.favouriteBooks.push(action.payload);
        },
        editFavouriteBook(state, action: PayloadAction<{ id: string; notes?: string }>) {
            const b = state.favouriteBooks.find(x => x.id === action.payload.id);
            if (b) b.notes = action.payload.notes;
        },
        deleteFavouriteBook(state, action: PayloadAction<string>) {
            state.favouriteBooks = state.favouriteBooks.filter(b => b.id !== action.payload);
        },
    },
});

export const { addFavouriteBook, deleteFavouriteBook, editFavouriteBook } = favoritesSlice.actions;

export default favoritesSlice.reducer;
