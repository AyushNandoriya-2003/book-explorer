import { useState, useCallback, memo } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Chip,
    Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    addFavouriteBook,
    deleteFavouriteBook,
} from "../../Store/Favourites/FavouritesSclice";
import AddFavouriteBook from "../../Pages/FavouriteBooks/AddFavouriteBook";

interface Props {
    book: any;
}

const BookCard = memo(({ book }: Props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const dispatch = useDispatch();
    const favorites = useSelector((state: any) => state.favouriteBooks.favouriteBooks, shallowEqual);
    const isFavorite = favorites.some((b: any) => b.id === book.id);

    const handleFavoriteClick = useCallback(() => {
        if (isFavorite) {
            dispatch(deleteFavouriteBook(book.id));
        } else {
            setOpenDialog(true);
        }
    }, [dispatch, isFavorite, book.id]);

    const handleSaveToFavourite = useCallback(
        (data: any) => {
            dispatch(addFavouriteBook({ ...data, ...book }));
            setOpenDialog(false);
        },
        [dispatch, book]
    );

    return (
        <>
            <Card
                sx={{
                    borderRadius: 1,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                {book.thumbnail ? (
                    <CardMedia
                        component="img"
                        height="180"
                        image={book.thumbnail}
                        alt={book.title}
                        sx={{
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <Box
                        height="180px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            bgcolor: "grey.100",
                        }}
                    >
                        <Icon icon="mdi:book-open-variant" width={48} height={48} color="#9e9e9e" />
                    </Box>
                )}

                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: "1rem !important",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '1.4rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {book.title}
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                            {book.authors?.join(", ")}
                        </Typography>
                        {book.description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 1,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    fontSize: '0.8rem'
                                }}
                                dangerouslySetInnerHTML={{ __html: book.description }}
                            />
                        )}
                    </Box>

                    {book.notes && (
                        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                            <strong>Notes:</strong> {book.notes}
                        </Typography>
                    )}

                    {Array.isArray(book.tags) && book.tags.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                                mt: 1,
                            }}
                        >
                            {book.tags.map((tag: string, idx: number) => (
                                <Chip key={idx} label={tag} color="primary" variant="outlined" size="small" />
                            ))}
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} arrow>
                            <IconButton
                                onClick={handleFavoriteClick}
                                color={isFavorite ? "error" : "default"}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Icon
                                    icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"}
                                    width={24}
                                    height={24}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="View Book Details" arrow>
                            <IconButton
                                component={Link}
                                to={`/book/${book.id}`}
                                color="primary"
                                aria-label="View book details"
                            >
                                <Icon icon="mdi:eye-outline" width={24} height={24} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardContent>
            </Card>

            <AddFavouriteBook
                open={openDialog}
                onSave={handleSaveToFavourite}
                onClose={() => setOpenDialog(false)}
            />
        </>
    );
});

export default BookCard;