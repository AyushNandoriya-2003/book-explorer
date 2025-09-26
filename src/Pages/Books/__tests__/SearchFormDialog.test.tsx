import { render, screen, fireEvent } from '@testing-library/react';
import SearchFormDialog from '../SearchForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../../../Store/Books/BooksSlice';
import favouritesReducer from '../../../Store/Favourites/FavouritesSclice';

// Mock getBooksBySearch to avoid real network/side effects
jest.mock('../../../Store/Books/BooksAction', () => ({
  getBooksBySearch: jest.fn(),
}));

const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
      favouriteBooks: favouritesReducer,
    },
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('SearchFormDialog', () => {
  test('shows validation error when submitting empty form', async () => {
    const onClose = jest.fn();
    renderWithStore(<SearchFormDialog open onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/please enter at least one field/i)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  test('calls getBooksBySearch and closes on valid submit', async () => {
    const onClose = jest.fn();
    const { getBooksBySearch } = jest.requireMock('../../../Store/Books/BooksAction');
    renderWithStore(<SearchFormDialog open onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Dune' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(getBooksBySearch).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});


