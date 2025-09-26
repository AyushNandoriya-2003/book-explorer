import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBooksBySearch } from "../../Store/Books/BooksAction";
import { useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import BookCard from "../../Components/BookCard/BookCard";
import SearchFormDialog from "./SearchForm";
import Loader from "../../Components/Loader/Loader";

const SearchPage = () => {
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useDispatch();

    const { books, loading, error, query, page, totalItems } = useSelector((state: any) => state.books);

    const fetchMoreBooks = () => {
        if (!query) return;
        getBooksBySearch(query, dispatch, page + 1);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #CDCDCD' }}>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>Manage Books</Typography>
                <Button
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Search Books
                </Button>
            </Box>
            <Box id="BookScrollDiv" sx={{ height: 'calc(100dvh - 10.5rem)', overflow: 'auto', p: 2, mt: 2 }}>
                {loading && books.length === 0 ? (
                    <Loader />
                ) : error ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100%' }}>
                        <Typography variant="h6" color="error">{error}</Typography>
                    </Box>
                ) : books.length === 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100%' }}>
                        <Typography variant="h6" color="text.secondary">No books found. Please perform a search.</Typography>
                    </Box>
                ) : (
                    <InfiniteScroll
                        dataLength={books.length}
                        next={fetchMoreBooks}
                        hasMore={books.length < totalItems}
                        loader={
                            <Box sx={{ mt: 2 }}>
                                <Loader />
                            </Box>
                        }
                        scrollableTarget="BookScrollDiv"
                    >
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            {books.map((book: any) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={book.id}>
                                    <BookCard book={book} />
                                </Grid>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                )}
            </Box>

            <SearchFormDialog open={openForm} onClose={() => setOpenForm(false)} />
        </Box>
    );
};

export default SearchPage;