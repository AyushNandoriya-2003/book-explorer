import axios from "axios";
import type { AppDispatch } from "../store";
import { appendBooks, setBookDetails, setBooks, setError, setLoading, setPage, setQuery, setTotalItems } from "./BooksSlice";

interface queryData {
    title: string
    author: string
    genre: string
}

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const MAX_RESULTS = 10;

export const getBooksBySearch = async (
    { title, author, genre }: queryData,
    dispatch: AppDispatch,
    page: number = 0
) => {
    dispatch(setLoading(true));
    try {

        let apiStartIndex = 0;
        if (page > 0) {
            apiStartIndex = (page - 1) * MAX_RESULTS;
        }

        if (page === 0) {
            dispatch(setBooks([]));
            dispatch(setQuery({ title, author, genre }));
        }

        const query = `${title ? `intitle:${title}` : ""} ${author ? `inauthor:${author}` : ""} ${genre ? `subject:${genre}` : ""}`;
        const response = await axios.get(
            `${BASE_URL}?q=${query}&startIndex=${apiStartIndex}&maxResults=${MAX_RESULTS}`
        );

        const booksData = response?.data?.items || [];
        const totalItems = response?.data?.totalItems || 0;

        if (Array.isArray(booksData) && booksData.length > 0) {
            const formattedBooks = booksData.map((book: any) => ({
                id: book?.id,
                title: book?.volumeInfo?.title,
                authors: book?.volumeInfo?.authors || [],
                description: book?.volumeInfo?.description,
                thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
            }));

            if (page === 0) {
                dispatch(setBooks(formattedBooks));
                dispatch(setPage(1));
            } else {
                dispatch(appendBooks(formattedBooks));
                dispatch(setPage(page));
            }

            dispatch(setTotalItems(totalItems));
        } else {
            if (page === 0) dispatch(setBooks([]));
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
