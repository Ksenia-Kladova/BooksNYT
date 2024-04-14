import { useEffect } from "react";
import "./App.css";
import { RootRouter } from "./components/RootRoute";
import { useAppDispatch } from "./app/hooks";
import { setLoggedIn, setLoggedOut } from "./app/store/slices/authenticationSlice";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./app/store/slices/userSlice";
import { auth } from "./firebase";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      dispatch(setLoggedIn());
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = { id: user.uid, email: user.email };
          dispatch(setUser(userData));
          console.log(user);
        }
      })
    } else {
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <RootRouter />
    </div >
  )
}

export default App
