import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    FormHelperText,
    Typography,
} from "@mui/material";
import Icon from "../../Components/Icon";
import { getBooksBySearch } from "../../Store/Books/BooksAction";
import { useDispatch } from "react-redux";

interface Props {
    open: boolean;
    onClose: () => void;
}

type Values = {
    title: string
    author: string
    genre: string
}

export default function SearchFormDialog({ open, onClose }: Props) {

    const defaultValues: Values = {
        title: "",
        author: "",
        genre: "",
    }

    const [values, setValues] = useState<Values>(defaultValues);

    const [error, setError] = useState("");

    // Hooks
    const dispatch = useDispatch()

    const handleChange = (field: string, value: string) => {
        setValues({ ...values, [field]: value });
        setError("");
    };

    const handleSubmit = () => {
        const { title, author, genre } = values;

        // Validation: At least one field must be filled
        if (!title.trim() && !author.trim() && !genre.trim()) {
            setError("Please enter at least one field.");
            return;
        }

        setError("");
        getBooksBySearch(values, dispatch)
        setValues(defaultValues)
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{ '& .MuiPaper-root': { width: '100%' } }}
        >
            <DialogTitle sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ pl: 1, fontSize: '1.25rem', fontWeight: 500 }}>Search Books</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                >
                    <Icon icon="mdi:close" width={24} height={24} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Title"
                    value={values.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Author"
                    value={values.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Genre/Keyword"
                    value={values.genre}
                    onChange={(e) => handleChange("genre", e.target.value)}
                    fullWidth
                />

                {error && <FormHelperText error>{error}</FormHelperText>}
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button
                    variant="outlined"
                    startIcon={<Icon icon="mdi:close-circle-outline" width={20} height={20} />}
                    onClick={onClose}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Icon icon="mdi:magnify" width={20} height={20} />}
                    onClick={handleSubmit}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
}