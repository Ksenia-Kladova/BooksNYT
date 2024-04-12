import { arrayRemove, doc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";


export async function deleteDataItemHistory(email: null, item: string) {
    await updateDoc(doc(db, "users", `${email}`), { history: arrayRemove(item) });
}

export async function addDataFavorite(email: null, title: string) {
    await updateDoc(doc(db, "users", `${email}`), {
        favorites: arrayUnion(title)
    });
}

export async function removeDataFavorite(email: null, title: string) {
    await updateDoc(doc(db, "users", `${email}`), {
        favorites: arrayRemove(title)
    });
}
