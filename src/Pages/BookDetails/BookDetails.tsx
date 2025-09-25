import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Divider,
    Button,
    IconButton,
    Container,
} from "@mui/material";
import { getBookById } from "../../Store/Books/BooksAction";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

const BookDetails = () => {
    // Hooks
    const { bookDetails, loading } = useSelector((state: any) => state.books);
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getBookById(id, dispatch);
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress size={50} />
            </Box>
        );
    }

    if (!bookDetails || Object.keys(bookDetails).length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Typography variant="h6" color="text.secondary">
                    Book not found.
                </Typography>
            </Box>
        );
    }

    const {
        title,
        authors,
        description,
        imageLinks,
        categories,
        publishedDate,
        publisher,
        pageCount,
        previewLink,
    } = bookDetails;

    return (
        <Container>
            <Box sx={{ pb: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid #CDCDCD' }}>
                <IconButton
                    size="small"
                    sx={{ border: theme => `1px solid ${theme.palette.primary.main}`, color: theme => theme.palette.primary.main }}
                >
                    <Icon icon={'material-symbols:arrow-back-rounded'} />
                </IconButton>
                <Typography>Book Details</Typography>
            </Box>
            <Grid container spacing={4} sx={{ pt: '1rem' }} alignItems="stretch">
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        sx={{
                            boxShadow: 4,
                            borderRadius: 3,
                            overflow: "hidden",
                            position: "sticky",
                            top: 20,
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={imageLinks?.thumbnail || "/no-cover.png"}
                            alt={title}
                            sx={{ width: "100%", objectFit: "cover" }}
                        />
                    </Card>
                </Grid>

                {/* Book Info */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ p: 1, boxShadow: 3, borderRadius: 3 }}>
                        <CardContent sx={{ p: 1, pb: '8px !important' }}>
                            <Typography variant="h4" fontWeight={600} gutterBottom>
                                {title}
                            </Typography>
                            {authors && (
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    <Icon
                                        icon="mdi:account-multiple"
                                        fontSize={22}
                                        style={{ marginRight: 6, verticalAlign: "middle" }}
                                    />
                                    By {authors.join(", ")}
                                </Typography>
                            )}

                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    mb: 2,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    <Icon
                                        icon="mdi:calendar"
                                        style={{ marginRight: 6, verticalAlign: "middle" }}
                                        fontSize={22}
                                    />
                                    Published: {publishedDate || "N/A"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <Icon
                                        icon="mdi:office-building"
                                        style={{ marginRight: 6, verticalAlign: "middle" }}
                                        fontSize={22}
                                    />
                                    Publisher: {publisher || "Unknown"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <Icon
                                        icon="mdi:file-document-outline"
                                        style={{ marginRight: 6, verticalAlign: "middle" }}
                                        fontSize={22}
                                    />
                                    Total Pages: {pageCount || "N/A"}
                                </Typography>
                            </Box>
                            {Array.isArray(categories) && categories?.length > 0 && (
                                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                                    {categories.map((cat: string, idx: number) => (
                                        <Chip
                                            key={idx}
                                            label={cat}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    ))}
                                </Box>
                            )}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6">
                                    Description
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: "text.secondary", fontSize: '0.8rem', fontWeight: 400 }}
                                >
                                    {description ? (
                                        <span dangerouslySetInnerHTML={{ __html: description }} />
                                    ) : (
                                        "No description available."
                                    )}
                                </Typography>
                            </Box>

                            {/* Preview Link */}
                            {previewLink && (
                                <Box sx={{ mt: 2, textAlign: 'end' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ borderRadius: '8px', fontWeight: 500, textTransform: 'capitalize' }}
                                        endIcon={<Icon icon="mage:preview" style={{ transform: 'scaleX(-1)' }} />}
                                        href={previewLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Preview Book
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BookDetails;
