// Toolkit Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import FavouriteBookSlice from './Favourites/FavouritesSclice'
import booksSlice from './Books/BooksSlice'

export const store = configureStore({
    reducer: {
        books: booksSlice,
        favouriteBooks: FavouriteBookSlice
    }
})

export type AppDispatch = typeof store.dispatch
