// React Imports
import { useEffect } from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

// Third Party Imports
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Custom Component Imports
import Loader from "../../Components/Loader/Loader";

// Store Imports
import { getBookById } from "../../Store/Books/BooksAction";

// Icon Imports
import { Icon } from "@iconify/react";

const BookDetails = () => {
    // Hooks
    const { bookDetails, loading } = useSelector((state: any) => state.books);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getBookById(id, dispatch);
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", height: 'calc(100dvh - 4rem)', alignItems: 'center' }}>
                <Loader />
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
        <Container sx={{ p: 2 }}>
            <Box sx={{ pb: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid #CDCDCD' }}>
                <IconButton
                    data-testid="back-button"
                    size="small"
                    sx={{
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        color: theme => theme.palette.primary.main
                    }}
                    onClick={() => navigate(-1)}
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
                            borderRadius: 1,
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
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ p: 1, boxShadow: 3, borderRadius: 1 }}>
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
                            {description &&
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6">
                                        Description
                                    </Typography>
                                    <Typography
                                        component={'span'}
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: '0.8rem',
                                            fontWeight: 400,
                                            "& ul": { pl: 2, mb: 1 },
                                            "& li": { mb: 0.5 },
                                            "& p": { mb: 1 }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    />
                                </Box>
                            }

                            {previewLink && (
                                <Box sx={{ mt: 2, textAlign: 'end' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ fontWeight: 500, textTransform: 'capitalize' }}
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
