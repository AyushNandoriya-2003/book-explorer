import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as BooksAction from "../../Store/Books/BooksAction";

// mock reducer (can be empty, since we only need dispatch)
const mockReducer = (state = {}) => state;

// mock getBooksBySearch
vi.spyOn(BooksAction, "getBooksBySearch").mockImplementation(() => vi.fn());

describe("SearchForm", () => {
    let onClose: () => void;
    let store: any;

    beforeEach(() => {
        onClose = vi.fn();
        store = configureStore({ reducer: { mock: mockReducer } });
    });

    const renderDialog = (open = true) =>
        render(
            <Provider store={store}>
                <SearchForm open={open} onClose={onClose} />
            </Provider>
        );

    it("renders title and inputs when open", () => {
        renderDialog();
        expect(screen.getByText(/search books/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/genre\/keyword/i)).toBeInTheDocument();
    });

    it("shows validation error if all fields empty and search clicked", () => {
        renderDialog();
        fireEvent.click(screen.getByRole("button", { name: /search/i }));
        expect(
            screen.getByText(/please enter at least one field/i)
        ).toBeInTheDocument();
    });

    it("dispatches getBooksBySearch if at least one field is filled", () => {
        renderDialog();
        fireEvent.change(screen.getByLabelText(/title/i), {
            target: { value: "React" },
        });
        fireEvent.click(screen.getByRole("button", { name: /search/i }));
        expect(BooksAction.getBooksBySearch).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });

    it("closes dialog on Cancel click", () => {
        renderDialog();
        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
        expect(onClose).toHaveBeenCalled();
    });

    it("closes dialog on X icon click", () => {
        renderDialog();
        fireEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(onClose).toHaveBeenCalled();
    });

    it("does not render when open is false", () => {
        renderDialog(false);
        expect(screen.queryByText(/search books/i)).not.toBeInTheDocument();
    });
});