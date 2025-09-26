import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";
import BookCard from "../../Components/BookCard/BookCard";

const FavouriteBooks = () => {
    const favourites = useSelector((state: any) => state.favouriteBooks.favouriteBooks);

    return (
        <Box sx={{ p: 2 }}>
            <Typography
                sx={{
                    fontSize: "1.5rem",
                    borderBottom: "1px solid #CDCDCD",
                    pb: 1,
                    fontWeight: 500,
                }}
            >
                Favourite Books
            </Typography>

            <Box sx={{ height: 'calc(100dvh - 10.5rem)', overflow: 'auto', p: 2, mt: 2 }}>
                {favourites.length > 0 ? (
                    <Grid container spacing={3}>
                        {favourites.map((book: any) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={book.id}>
                                <BookCard book={book} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            mt: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No favourite books yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Start adding some books to your favourites ❤️
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default FavouriteBooks;
