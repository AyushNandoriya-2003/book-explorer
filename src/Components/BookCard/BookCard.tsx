import { Card, CardContent, CardMedia, Typography, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteBook, deleteFavouriteBook } from "../../Store/Favourites/FavouritesSclice";

interface Props {
    book: any;
}

const BookCard = ({ book }: Props) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: any) => state.favouriteBooks.favouriteBooks);
    const isFavorite = favorites.some((b: any) => b.id === book.id);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(deleteFavouriteBook(book.id));
        } else {
            dispatch(addFavouriteBook(book));
        }
    };

    return (
        <Card sx={{ maxWidth: 280, borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
            {book.thumbnail && (
                <CardMedia
                    component="img"
                    height="180"
                    image={book.thumbnail}
                    alt={book.title}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6" gutterBottom noWrap>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {book.authors?.join(", ")}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <IconButton
                        onClick={handleFavoriteClick}
                        color={isFavorite ? "error" : "default"}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Icon icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"} width={24} height={24} />
                    </IconButton>

                    <IconButton
                        component={Link}
                        to={`/book/${book.id}`}
                        color="primary"
                        aria-label="View details"
                    >
                        <Icon icon="mdi:eye-outline" width={24} height={24} />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BookCard;
