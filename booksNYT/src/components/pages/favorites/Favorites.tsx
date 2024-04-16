import { List } from '../../list/List';
import type { Data } from '../../../utils/DTO';
import { useState } from "react";
import { useBookCategory } from "../../select/SelectContext";
import { useGetBooksCategoryQuery } from "../../../app/api";
import { useDatabaseFavorites } from '../../../hooks/useDatabaseFavorites';

type State = string[]

function filterObjectsByTitle(objects: Data[] | undefined, arrStr: string[]): Data[] | undefined {
    const filterArr = objects?.filter(obj => arrStr.includes(obj.title));

    return filterArr;
}

export default function Favorites() {
    const { selectedCategory } = useBookCategory();
    const { data: books } = useGetBooksCategoryQuery(selectedCategory.value);
    const [fav, setFav] = useState<State>([]);
    useDatabaseFavorites((dataUser) => {
        setFav(dataUser.favorites);
    });
  
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