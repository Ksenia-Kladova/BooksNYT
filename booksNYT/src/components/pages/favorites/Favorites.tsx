import { useGetBooksFictionQuery } from "../../../app/api";
import { List } from '../../list/List';
import type { Data } from '../../../utils/DTO';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect, useState } from "react";

function filterObjectsById(objects: Data[] | undefined, arrStr: string[]): Data[] | undefined {
    const ids = arrStr.map(item => parseInt(item));
    const filterArr = objects?.filter(obj => ids.includes(obj.id));

    return filterArr;
}

export function Favorites() {
    const { email } = useAuth();
    const { data: books, isLoading } = useGetBooksFictionQuery('');
    const [fav, setFav] = useState([]);
    const emailRef = doc(db, "users", `${email}`);

    useEffect(() => {
        getDoc(emailRef)
            .then(res => res.data())
            .then(data => setFav(data?.favorites))
    }, [setFav]);

    const listBooks = filterObjectsById(books, fav);
    if (fav.length === 0 || !listBooks) return <h1>No favorite books</h1>

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Favorite</h1>
            <List list={listBooks} />
        </>
    )
}