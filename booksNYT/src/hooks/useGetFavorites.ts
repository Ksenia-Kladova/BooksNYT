import { useEffect } from "react";
import { useAuth } from "./use-auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface UserData {
    favorites: string[];
}

export const useGetFavorites = (callback: (data: UserData) => void, title: string) => {
    const { email } = useAuth();
    const docRef = doc(db, "users", `${email}`);

    useEffect(() => {
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();
            callback(data && data.favorites.includes(title))
        });
        return () => unsubscribe();
    })
}