import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn, setLoggedOut } from "../app/store/slices/authenticationSlice";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../app/store/slices/userSlice";
import { auth } from "../firebase";

export function useLoginCheck(){
    const dispatch = useAppDispatch();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
  
      if (isLoggedIn === "true") {
        dispatch(setLoggedIn());
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userData = { id: user.uid, email: user.email };
            dispatch(setUser(userData));
          }
        })
      } else {
        dispatch(setLoggedOut());
      }
    }, [dispatch]);
}