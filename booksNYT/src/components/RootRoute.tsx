import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMassage } from './ErrorMessage';
import { PrivatePage } from './PrivatePage';
const Home = lazy(() => import('./pages/home/Home'));
const Book = lazy(() => import('./pages/book/Book'));
const SignUp = lazy(() => import('./pages/signup/SignUp'));
const LogIn = lazy(() => import('./pages/login/LogIn'));
const Favorites = lazy(() => import('./pages/favorites/Favorites'));
const History = lazy(() => import('./pages/history/History'));
const Search = lazy(() => import('./pages/Search/Search'));
const BookRank = lazy(() => import('./pages/book-rank/BookRank'));

export function RootRouter() {
  return (
    <ErrorBoundary FallbackComponent={ErrorMassage}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Book />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<LogIn />} />
          <Route path='history' element={<PrivatePage><History /></PrivatePage>} />
          <Route path='favorite' element={<PrivatePage><Favorites /></PrivatePage>} />
          <Route path='search' element={<Search />}>
            <Route path='?title=:title' id="search" element={<Search />} />
          </Route>
          <Route path='bookrank' element={<BookRank />}>
            <Route path='?title=:title' element={<BookRank />} />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}