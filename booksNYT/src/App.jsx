import "./App.css";
import { Home } from "./components/pages/home/Home";
import { Book } from "./components/pages/book/Book.tsx";
import { Layout } from "./components/Layout/Layout.jsx";
import { Search } from "./components/pages/Search/Search.tsx";
import { Favorites } from "./components/pages/favorites/Favorites.tsx";
import { SignUp } from "./components/pages/signup/SignUp.tsx";
import { LogIn } from "./components/pages/login/LogIn.tsx";
import { History } from "./components/pages/history/History.tsx";
import { BookRank } from "./components/pages/book-rank/BookRank.tsx"
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
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
    </div >
  )
}

export default App
