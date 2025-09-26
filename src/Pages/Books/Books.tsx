import { useState } from "react";
import { Grid, Box, CircularProgress, Typography, Button } from "@mui/material";
import SearchForm from "./SearchForm";
import BookCard from "../../Components/BookCard/BookCard";
import { useSelector } from "react-redux";

const SearchPage = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    // Hooks
    const { books, loading, error } = useSelector((state: any) => state.books);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #CDCDCD' }}>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>Manage Books</Typography>
                <Button
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Open Search
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100dvh - 10.5rem)', overflow: 'auto', p: 2, mt: 2 }}>
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                )}
                {!loading && error && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100%' }}>
                        <Typography variant="h6" color="error">
                            {error}
                        </Typography>
                    </Box>
                )}
                {!loading && !error && books.length === 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100%' }}>
                        <Typography variant="h6" color="text.secondary">
                            No books found. Please perform a search.
                        </Typography>
                    </Box>
                )}
                {!loading && !error && books.length > 0 && (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {books.map((book: any) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={book.id}>
                                <BookCard book={book} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            <SearchForm
                open={openForm}
                onClose={() => setOpenForm(false)}
            />
        </Box>
    );
};

export default SearchPage;
