import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "./use-auth";
import { db } from "../firebase";

type Item = string;

interface UserDataHistory {
    history: Item[];
}

export const useDatabaseHistory = (callback: (data: UserDataHistory) => void) => {
    const { email } = useAuth();
    const docRef = doc(db, "users", `${email}`);

    useEffect(() => {
        onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data() as UserDataHistory;
            callback(data);
        });
    }, []);
};