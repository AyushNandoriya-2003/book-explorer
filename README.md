# Book Explorer

Discover, search, and manage your favorite books using the Google Books API. This is a React + TypeScript app built with Vite, Material UI, and Redux Toolkit, featuring infinite scroll, detailed book pages, and a local favorites list with notes and tags.

## Features
- Search books by title, author, or genre/keyword
- Infinite scrolling of results
- View detailed information for any book
- Add/remove books to a local favorites list
- Add notes and tags to your favorite books
- Client-side state management with Redux Toolkit
- Modern UI built with Material UI

## Tech Stack
- React 19 + TypeScript + Vite 7
- Redux Toolkit and React-Redux
- Material UI (MUI) + Emotion
- Axios for HTTP requests
- React Router v7
- React Infinite Scroll Component
- Jest + Testing Library for unit/integration tests (jsdom environment)
- ESLint 9 for linting
- Optional: React Toastify for notifications

## Getting Started

### Prerequisites
- Node.js >= 18.17

### Install
```bash
npm install
# or
yarn
```

### Development
```bash
npm run dev
# or
yarn dev
```

### Build
```bash
npm run build
# or
yarn build
```

### Preview (serve the production build locally)
```bash
npm run preview
# or
yarn preview
```

### Lint
```bash
npm run lint
# or
yarn lint
```

### Test
```bash
# run all tests once
npm test

# watch mode (great during development)
npm run test:watch

# CI-friendly (serial) run
npm run test:ci
```

## Scripts
- `dev`: Start Vite dev server
- `build`: Type-check then build production bundle
- `preview`: Preview the built app
- `lint`: Run ESLint on the project
- `test`: Run Jest tests once (jsdom)
- `test:watch`: Run tests in watch mode
- `test:ci`: Run tests in-band for CI

## Routes
- `/` — Search and browse books
- `/book/:id` — Book details page
- `/favorites` — Your favorite books (with notes and tags)

## How Search Works
The app queries the Google Books API using any combination of:
- `intitle:{title}`
- `inauthor:{author}`
- `subject:{genre}`

Requests are paginated with a page size of 10 and fetched incrementally as you scroll.

## Project Structure
```text
book-explorer/
  src/
    Components/
      BookCard/BookCard.tsx
      Icon/index.tsx
      Loader/Loader.tsx
    Layout/Navbar.tsx
    Pages/
      Books/Books.tsx
      Books/SearchForm.tsx
      BookDetails/BookDetails.tsx
      FavouriteBooks/FavouriteBooks.tsx
      FavouriteBooks/AddFavouriteBook.tsx
    Routes/Routes.tsx
    Store/
      store.ts
      Books/
        BooksAction.ts
        BooksSlice.ts
      Favourites/
        FavouritesSclice.ts
    App.tsx
    main.tsx
```

## State Management
- `BooksSlice` stores the current query, results, pagination, loading and error state, and selected book details.
- `FavouritesSclice` stores the list of favorite books with optional `notes` and `tags` fields.

## Environment & API Keys
This project uses the public Google Books API endpoints without a key for basic search and detail queries. If you need higher quotas or reliability, configure an API key and append it as `&key=YOUR_API_KEY` to requests in `src/Store/Books/BooksAction.ts`.

## Accessibility & UX
- Keyboard-accessible dialogs and buttons
- Semantic components and focus management provided by MUI
- Graceful loading and empty states

## Testing
- Tests are written with Jest and Testing Library.
- DOM-related tests run in a jsdom environment.
- Test setup lives in `src/setupTests.ts`.
- Example specs can be found under `__tests__` folders next to components/pages.

## License
MIT