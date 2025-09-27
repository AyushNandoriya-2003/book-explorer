import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import BookCard from "./BookCard";
import favouriteBooksReducer from "../../Store/Favourites/FavouritesSclice";
import type { RootState } from "@reduxjs/toolkit/query";

// Mock AddFavouriteBook (dialog)
vi.mock("../../Pages/FavouriteBooks/AddFavouriteBook", () => ({
    default: ({ open }: { open: boolean }) =>
        open ? <div data-testid="mock-dialog">Dialog Open</div> : null,
}));

describe("BookCard component", () => {
    const book = {
        id: "1",
        title: "React Testing with Vitest",
        authors: ["Ayush"],
        description: "<p>A testing guide</p>",
        thumbnail: "",
        tags: ["react", "testing"],
    };

    const rootReducer = combineReducers({
        favouriteBooks: favouriteBooksReducer,
    });

    const renderWithStore = (preloadedState?: Partial<any>) => {
        // Use the combined reducer
        const store = configureStore({
            reducer: rootReducer,
            preloadedState: preloadedState as any || { // Cast preloadedState to any if needed for test simplicity
                favouriteBooks: { favouriteBooks: [] },
            },
        });

        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <BookCard book={book} />
                </MemoryRouter>
            </Provider>
        );
    };

    it("renders book title and author", () => {
        renderWithStore();
        expect(screen.getByText("React Testing with Vitest")).toBeInTheDocument();
        expect(screen.getByText("Ayush")).toBeInTheDocument();
    });

    it("shows tags if present", () => {
        renderWithStore();
        expect(screen.getByText("react")).toBeInTheDocument();
        expect(screen.getByText("testing")).toBeInTheDocument();
    });

    it("opens AddFavouriteBook dialog when adding to favorites", async () => {
        const user = userEvent.setup();
        renderWithStore();

        const favBtn = screen.getByRole("button", { name: /add to favorites/i });
        await user.click(favBtn);

        expect(screen.getByTestId("mock-dialog")).toBeInTheDocument();
    });

    it("shows remove from favorites if already in state", () => {
        renderWithStore({
            favouriteBooks: { favouriteBooks: [book] },
        });

        const favBtn = screen.getByRole("button", { name: /remove from favorites/i });
        expect(favBtn).toBeInTheDocument();
    });

    it("navigates to book details link", () => {
        renderWithStore();
        const detailsLink = screen.getByRole("link", { name: /view book details/i });
        expect(detailsLink).toHaveAttribute("href", "/book/1");

    });
});