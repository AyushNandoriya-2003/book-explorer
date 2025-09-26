import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    FormHelperText,
    IconButton,
    Typography,
    Autocomplete,
} from "@mui/material";
import Icon from "../../Components/Icon";
import { useCallback, useState } from "react";

const defaultTagOptions = ['Fiction', 'Science', 'Fantasy', 'Programming', 'History', 'Thriller'];

interface NotesFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { notes: string, tags: string[] }) => void;
}

const AddFavouriteBook = ({ open, onClose, onSave }: NotesFormProps) => {
    const [notes, setNotes] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const handleClose = () => {
        setError("");
        setNotes("");
        setTags([]);
        onClose();
    };

    const handleTagsChange = (_: any, newValue: string[]) => {
        setTags(newValue);
        setError("");
    };

    const handleSubmit = useCallback(() => {
        if (!notes.trim() && tags.length === 0) {
            setError("Please add at least one note or tag.");
            return;
        }

        const finalTags = tags.map(tag => typeof tag === "string" ? tag.trim() : "");
        onSave({ notes: notes.trim(), tags: finalTags });
        handleClose();
    }, [notes, tags, onSave, handleClose]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{ '& .MuiPaper-root': { width: '100%' } }}
        >
            <DialogTitle sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ pl: 1, fontSize: '1.25rem', fontWeight: 500 }}>Add Notes & Tags</Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                >
                    <Icon icon="mdi:close" width={24} height={24} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Notes"
                    multiline
                    rows={3}
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Box>
                    <Autocomplete
                        multiple
                        freeSolo
                        options={defaultTagOptions}
                        value={tags}
                        onChange={handleTagsChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tags"
                                placeholder="Add or select tags..."
                                fullWidth
                            />
                        )}
                    />
                </Box>

                {error && (
                    <FormHelperText error sx={{ mx: 0, mt: -1 }}>
                        {error}
                    </FormHelperText>
                )}

            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ textTransform: 'capitalize' }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddFavouriteBook;