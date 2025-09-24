import { Routes, Route } from "react-router-dom";

// Pages Imports
import BookDetails from "../Pages/BookDetails/BookDetails";
import FavouriteBooks from "../Pages/FavouriteBooks/FavouriteBooks";
import Books from "../Pages/Books/Books";

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