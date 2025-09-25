import { useState } from "react";
import { Grid, Box, CircularProgress, Typography, Button } from "@mui/material";
import SearchForm from "./SearchForm";
import BookCard from "../../Components/BookCard/BookCard";
import { useSelector } from "react-redux";

const SearchPage = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    // Hooks
    const { books, loading } = useSelector((state: any) => state.books);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #CDCDCD' }}>
                <Typography>Manage Books</Typography>
                <Button
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                    sx={{ borderRadius: '8px', textTransform: 'capitalize' }}
                >
                    Open Search
                </Button>
            </Box>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && books.length === 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No books found. Please perform a search.
                    </Typography>
                </Box>
            )}

            {!loading && books.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {books.map((book: any) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={book.id}>
                            <BookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <SearchForm
                open={openForm}
                onClose={() => setOpenForm(false)}
            />
        </Box>
    );
}

export default SearchPage