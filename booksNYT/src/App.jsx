import "./App.css";
import { Home } from "./components/pages/home/Home";
import { Book } from "./components/pages/book/Book.tsx";
import { Layout } from "./components/Layout/Layout.jsx";
import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">

      <Routes >
        <Route  path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Book />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
