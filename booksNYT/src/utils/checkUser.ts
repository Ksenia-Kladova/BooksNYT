import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

type Data = {
    id: string,
    email: string | null
}

export function useCheckUser() {
    const [user, setUser] = useState<Data>({ id: '', email: '' });
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userData = { id: user.uid, email: user.email };
            setUser(userData);
        }
    })

    const email = user.email;
    const login = !!isLoggedIn

    return { login, email };
}