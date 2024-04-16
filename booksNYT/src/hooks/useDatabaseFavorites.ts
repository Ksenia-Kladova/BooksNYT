import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "./use-auth";
import { db } from "../firebase";

type Item = string;

interface UserDataFavorites {
    favorites: Item[];
}

export const useDatabaseFavorites = (callback: (data: UserDataFavorites) => void) => {
    const { email } = useAuth();
    const docRef = doc(db, "users", `${email}`);

    useEffect(() => {
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data() as UserDataFavorites;
            callback(data);
        });
        return () => unsubscribe();
    });
};
