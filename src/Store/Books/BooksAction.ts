import axios from "axios";
import type { AppDispatch } from "../store";
import { setBookDetails, setBooks, setError, setLoading } from "./BooksSlice";

interface queryData {
    title: string
    author: string
    genre: string
}

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'


export const getBooksBySearch = async (
    { title, author, genre }: queryData,
    dispatch: AppDispatch
) => {
    dispatch(setLoading(true));
    try {
        const query = `${title ? `intitle:${title}` : ""} ${author ? `inauthor:${author}` : ""
            } ${genre ? `subject:${genre}` : ""}`;

        const response = await axios.get(`${BASE_URL}?q=${query}`);

        const booksData = response?.data?.items || [];

        if (Array.isArray(booksData) && booksData.length > 0) {
            dispatch(
                setBooks(
                    booksData.map((book: any) => ({
                        id: book?.id,
                        title: book?.volumeInfo?.title,
                        authors: book?.volumeInfo?.authors || [],
                        description: book?.volumeInfo?.description,
                        thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
                    }))
                )
            );
        } else {
            dispatch(setBooks([]))
        }
    } catch (error: any) {
        dispatch(setError("Failed to fetch books"));
    } finally {
        dispatch(setLoading(false));
    }
};

export const getBookById = async (id: string, dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);

        if (response?.status === 200 && response?.data?.volumeInfo) {
            dispatch(setBookDetails(response.data.volumeInfo));
        } else {
            dispatch(setBookDetails({}));
        }
    } catch (error: any) {
        dispatch(setError("Failed to fetch book details"));
        dispatch(setBookDetails({}));
    } finally {
        dispatch(setLoading(false));
    }
};
