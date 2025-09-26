import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialState {
    books: any[];
    bookDetails: any;
    loading: boolean;
    error: string | null;
    query: { title?: string; author?: string; genre?: string } | null;
    totalItems: number;
    page: number;
}

const initialState: initialState = {
    books: [],
    bookDetails: {},
    loading: false,
    error: null,
    query: null,
    totalItems: 0,
    page: 0,
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks(state, action: PayloadAction<any[]>) {
            state.books = action.payload;
        },
        appendBooks(state, action: PayloadAction<any[]>) {
            state.books = [...state.books, ...action.payload];
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setBookDetails(state, action: PayloadAction<any>) {
            state.bookDetails = action.payload;
        },
        setError(state, action: PayloadAction<any>) {
            state.error = action.payload;
        },
        setQuery(state, action: PayloadAction<any>) {
            state.query = action.payload;
        },
        setTotalItems(state, action: PayloadAction<number>) {
            state.totalItems = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
});

export const {
    setBooks,
    appendBooks,
    setLoading,
    setBookDetails,
    setError,
    setQuery,
    setTotalItems,
    setPage,
} = booksSlice.actions;

export default booksSlice.reducer;