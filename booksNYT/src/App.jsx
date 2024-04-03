import "./App.css";
import { Home } from "./components/pages/home/Home";
import { Book } from "./components/pages/book/Book.tsx";
import { Layout } from "./components/Layout/Layout.jsx";
import { Search } from "./components/pages/Search/Search.tsx";
import { SignIn } from "./components/pages/signin/Signin.tsx";
import { BookRank } from "./components/pages/book-rank/BookRank.tsx"
import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Book />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='search' element={<Search />}>
            <Route path='?title=:title' id="search" element={<Search />} />
          </Route>
          <Route path='bookrank' element={<BookRank />}>
            <Route path='?title=:title' element={<BookRank />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
