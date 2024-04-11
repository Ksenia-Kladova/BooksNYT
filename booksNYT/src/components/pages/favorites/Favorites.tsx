import { useGetBooksCategoryQuery, useGetBooksFictionQuery } from "../../../app/api";
import { List } from '../../list/List';
import type { Data } from '../../../utils/DTO';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect, useState } from "react";
import { useBookCategory } from "../../select/SelectContext";

function filterObjectsByTitle(objects: Data[] | undefined, arrStr: string[]): Data[] | undefined {
    const filterArr = objects?.filter(obj => arrStr.includes(obj.title));

    return filterArr;
}

export default function Favorites() {
    const { email } = useAuth();
    const { selectedCategory } = useBookCategory();
    const { data: books } = useGetBooksCategoryQuery(selectedCategory.value);
    const [fav, setFav] = useState([]);
    const emailRef = doc(db, "users", `${email}`);

    useEffect(() => {
        getDoc(emailRef)
            .then(res => res.data())
            .then(data => setFav(data?.favorites))
    }, [setFav]);

    if (books === undefined) return <p>Loading...</p>
    const listBooks = filterObjectsByTitle(books, fav);
    if (fav.length === 0 || listBooks?.length === 0 || !listBooks) return (
        <>
            <h1>Favorite</h1>
            <h2>{selectedCategory.label}</h2>
            <p>No favorite books</p>
        </>
    )

    return (
        <>
            <h1>Favorite</h1>
            <h2>{selectedCategory.label}</h2>
            <List list={listBooks} />
        </>
    )
}