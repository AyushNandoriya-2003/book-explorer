import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Pages Imports
const BookDetails = lazy(() => import("../Pages/BookDetails/BookDetails"))
const FavouriteBooks = lazy(() => import("../Pages/FavouriteBooks/FavouriteBooks"))
const Books = lazy(() => import("../Pages/Books/Books"))

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/favorites" element={<FavouriteBooks />} />
            <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
    );
}

export default AppRoutes