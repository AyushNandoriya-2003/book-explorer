import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialState {
    books: any[];
    bookDetails: any;
    loading: boolean;
    error: string | null;
}

const initialState: initialState = {
    books: [],
    bookDetails: {},
    loading: false,
    error: null,
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks(state, action: PayloadAction<any[]>) {
            state.books = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setBookDetails(state, action: PayloadAction<any>) {
            state.bookDetails = action.payload
        },
        setError(state, action: PayloadAction<any>) {
            state.error = action.payload
        }
    },
});

export const { setBooks, setLoading, setBookDetails, setError } = booksSlice.actions

export default booksSlice.reducer;
