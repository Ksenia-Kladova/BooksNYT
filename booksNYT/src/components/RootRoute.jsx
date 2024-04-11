import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from "./pages/home/Home";
import Book from "./pages/book/Book.tsx";
import Search from "./pages/Search/Search.tsx";
import Favorites from "./pages/favorites/Favorites.tsx";
import SignUp from './pages/signup/SignUp.tsx';
import LogIn from "./pages/login/LogIn.tsx";
import History from "./pages/history/History.tsx";
import BookRank from "./pages/book-rank/BookRank.tsx"


export function RootRouter() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=':id' element={<Book />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<LogIn />} />
        <Route path='history' element={<History />} />
        <Route path='favorite' element={<Favorites />} />
        <Route path='search' element={<Search />}>
          <Route path='?title=:title' id="search" element={<Search />} />
        </Route>
        <Route path='bookrank' element={<BookRank />}>
          <Route path='?title=:title' element={<BookRank />} />
        </Route>
      </Route>
    </Routes>
  )
}