import axios from "axios";
import type { AppDispatch } from "../store";
import { setBooks, setLoading } from "./BooksSlice";

interface queryData {
    title: string
    author: string
    genre: string
}

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

export const getBooksBySearch = async ({ title, author, genre }: queryData, dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    const query = `${title ? `intitle:${title}` : ""} ${author ? `inauthor:${author}` : ""} ${genre ? `subject:${genre}` : ""}`
    const response = await axios.get(`${BASE_URL}${query}`);

    const booksData = response?.data?.items || [];

    if (Array.isArray(booksData) && booksData?.length > 0) {
        dispatch(setBooks(booksData.map((book?: any) => ({
            id: book?.id,
            title: book?.volumeInfo?.title,
            authors: book?.volumeInfo?.authors || [],
            description: book?.volumeInfo?.description,
            thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
        }))))
        dispatch(setLoading(false))
    }
}