import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./Routes";

// Mock lazy-loaded pages
vi.mock("../Pages/BookDetails/BookDetails", () => ({
    default: () => <div data-testid="book-details-page">Book Details Page</div>,
}));
vi.mock("../Pages/FavouriteBooks/FavouriteBooks", () => ({
    default: () => <div data-testid="favourite-books-page">Favourite Books Page</div>,
}));
vi.mock("../Pages/Books/Books", () => ({
    default: () => <div data-testid="books-page">Books Page</div>,
}));

describe("AppRoutes", () => {
    const renderWithRoute = (initialRoute: string) =>
        render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <Suspense fallback={<div>Loading...</div>}>
                    <AppRoutes />
                </Suspense>
            </MemoryRouter>
        );

    it("renders Books page at root path '/'", async () => {
        renderWithRoute("/");
        await waitFor(() => {
            expect(screen.getByTestId("books-page")).toBeInTheDocument();
        });
    });

    it("renders FavouriteBooks page at '/favorites'", async () => {
        renderWithRoute("/favorites");
        await waitFor(() => {
            expect(screen.getByTestId("favourite-books-page")).toBeInTheDocument();
        });
    });

    it("renders BookDetails page at '/book/:id'", async () => {
        renderWithRoute("/book/1");
        await waitFor(() => {
            expect(screen.getByTestId("book-details-page")).toBeInTheDocument();
        });
    });
});
