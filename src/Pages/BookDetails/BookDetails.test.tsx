import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";
import booksReducer from "../../Store/Books/BooksSlice";
import { getBookById } from "../../Store/Books/BooksAction";

// --- Mock Loader component ---
vi.mock("../../Components/Loader/Loader", () => ({
    default: () => <div data-testid="loader">Loading...</div>,
}));

// --- Mock getBookById named export ---
vi.mock("../../Store/Books/BooksAction", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../Store/Books/BooksAction")>();
    return {
        ...actual,
        getBookById: vi.fn(),
    };
});

// --- Mock react-router-dom's useNavigate and useParams ---
const navigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal<any>();
    return {
        ...actual,
        useNavigate: () => navigateMock,
        useParams: () => ({ id: "1" }),
    };
});

describe("BookDetails component", () => {
    const book = {
        id: "1",
        title: "React Testing with Vitest",
        authors: ["Test"],
        description: "<p>Test description</p>",
        imageLinks: { thumbnail: "/cover.png" },
        categories: ["React", "Testing"],
        publishedDate: "2025-09-27",
        publisher: "Test Publisher",
        pageCount: 200,
        previewLink: "http://example.com/preview",
    };

    const initialState = {
        books: [],             // list of books
        bookDetails: {},       // initially empty
        loading: false,
        error: null,
        query: "",
        totalItems: 0,
        page: 1,
    };

    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: { books: booksReducer },
            preloadedState: { books: initialState },
        });
        vi.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/book/1"]}>
                    <Routes>
                        <Route path="/book/:id" element={<BookDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

    it("renders Loader when loading is true", async () => {
        store = configureStore({
            reducer: { books: booksReducer },
            preloadedState: {
                books: { ...initialState, loading: true },
            },
        });

        renderComponent();
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders 'Book not found' if no book details", async () => {
        renderComponent();
        expect(screen.getByText(/book not found/i)).toBeInTheDocument();
    });

    it("renders book details correctly when data is present", async () => {
        store = configureStore({
            reducer: { books: booksReducer },
            preloadedState: {
                books: { ...initialState, bookDetails: book },
            },
        });

        renderComponent();

        expect(screen.getByText(book.title)).toBeInTheDocument();
        expect(screen.getByText(/by Test/i)).toBeInTheDocument();
        expect(screen.getByText(/Published: 2025-09-27/i)).toBeInTheDocument();
        expect(screen.getByText(/Publisher: Test Publisher/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Pages: 200/i)).toBeInTheDocument();
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("Testing")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Preview Book")).toHaveAttribute(
            "href",
            book.previewLink
        );
    });

    it("calls getBookById on mount with correct ID", async () => {
        renderComponent();
        expect(getBookById).toHaveBeenCalledWith("1", expect.any(Function));
    });

    it("navigates back when back button clicked", async () => {
        const user = userEvent.setup();

        store = configureStore({
            reducer: { books: booksReducer },
            preloadedState: {
                books: { ...initialState, bookDetails: book },
            },
        });

        renderComponent();

        // wait for back button to render
        const backButton = await screen.findByTestId("back-button");
        await user.click(backButton);

        expect(navigateMock).toHaveBeenCalledWith(-1);
    });
});