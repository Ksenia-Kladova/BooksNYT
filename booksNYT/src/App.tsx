import "./App.css";
import { RootRouter } from "./components/RootRoute";
import { useLoginCheck } from "./hooks/useLoginCheck";

const App = () => {
  useLoginCheck();

  return (
    <div className="App">
      <RootRouter />
    </div >
  )
}

export default App
