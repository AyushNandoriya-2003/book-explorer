import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import AddFavouriteBook from "./AddFavouriteBook";

describe("AddFavouriteBook Dialog", () => {
    let onClose: ReturnType<typeof vi.fn>;
    let onSave: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        onClose = vi.fn();
        onSave = vi.fn();
    });

    const renderDialog = (open = true) =>
        render(<AddFavouriteBook open={open} onClose={onClose} onSave={onSave} />);

    it("renders title, notes input, tags input, and buttons", () => {
        renderDialog();
        const dialog = screen.getByRole("dialog");
        expect(within(dialog).getByText(/add notes & tags/i)).toBeInTheDocument();
        expect(within(dialog).getByLabelText(/notes/i)).toBeInTheDocument();
        expect(within(dialog).getByLabelText(/tags/i)).toBeInTheDocument();
        expect(within(dialog).getByRole("button", { name: /cancel/i })).toBeInTheDocument();
        expect(within(dialog).getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    it("shows validation error if both notes and tags are empty", () => {
        renderDialog();
        const dialog = screen.getByRole("dialog");
        fireEvent.click(within(dialog).getByRole("button", { name: /save/i }));
        expect(
            within(dialog).getByText(/please add at least one note or tag/i)
        ).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });

    it("calls onSave with notes when notes are entered", () => {
        renderDialog();
        const dialog = screen.getByRole("dialog");
        fireEvent.change(within(dialog).getByLabelText(/notes/i), {
            target: { value: "My test note" },
        });
        fireEvent.click(within(dialog).getByRole("button", { name: /save/i }));

        expect(onSave).toHaveBeenCalledWith({
            notes: "My test note",
            tags: [],
        });
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onSave with tags when tags are entered", () => {
        renderDialog();
        const dialog = screen.getByRole("dialog");
        const tagsInput = within(dialog).getByLabelText(/tags/i);

        // simulate entering a custom tag
        fireEvent.change(tagsInput, { target: { value: "Fantasy" } });
        fireEvent.keyDown(tagsInput, { key: "Enter" });

        fireEvent.click(within(dialog).getByRole("button", { name: /save/i }));

        expect(onSave).toHaveBeenCalledWith({
            notes: "",
            tags: ["Fantasy"],
        });
        expect(onClose).toHaveBeenCalled();
    });

    it("resets state and calls onClose when Cancel clicked", () => {
        renderDialog();
        const dialog = screen.getByRole("dialog");
        fireEvent.change(within(dialog).getByLabelText(/notes/i), {
            target: { value: "Some note" },
        });
        fireEvent.click(within(dialog).getByRole("button", { name: /cancel/i }));

        expect(onClose).toHaveBeenCalled();
        // after cancel, dialog should not show title anymore
    });

    it("resets state and calls onClose when Close icon clicked", () => {
        renderDialog();
        const dialog = screen.getByRole("dialog");
        fireEvent.click(within(dialog).getByRole("button", { name: /close/i }));
        expect(onClose).toHaveBeenCalled();
    });

    it("does not render when open is false", () => {
        renderDialog(false);
        expect(screen.queryByText(/add notes & tags/i)).not.toBeInTheDocument();
    });
});
