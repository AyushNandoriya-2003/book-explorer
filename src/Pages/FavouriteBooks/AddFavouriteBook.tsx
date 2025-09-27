// React Imports
import { useCallback, useState } from "react";

// MUI Imports
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

// Icon Imports
import Icon from "../../Components/Icon";

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

    const validateForm = (notesValue: string, tagsValue: string[]) => {
        if (!notesValue.trim() && tagsValue.length === 0) {
            return "Please add at least one note or tag.";
        }
        return "";
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setNotes(value);
        setError(validateForm(value, tags)); // Re-validate on change
    };

    // Tags change handler
    const handleTagsChange = (_: any, newValue: string[]) => {
        setTags(newValue);
        setError(validateForm(notes, newValue)); // Re-validate on change
    };

    const handleSubmit = useCallback(() => {
        const errorMessage = validateForm(notes, tags);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        const finalTags = tags.map(tag => (typeof tag === "string" ? tag.trim() : ""));
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
                <IconButton aria-label="close" onClick={handleClose}>
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
                    onChange={handleNotesChange}
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
                                helperText={
                                    <Typography variant="caption" display="flex" alignItems="center" gap={0.5}>
                                        <Icon icon={'material-symbols:info-outline-rounded'} fontSize={15} /> Press Enter to create a new tag
                                    </Typography>
                                }
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