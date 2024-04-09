import { useGetBooksFictionQuery } from "../../../app/api";
import { useAppSelector } from "../../../hooks/redux-hook";
import { List } from '../../list/List';
import type { Data } from '../../../utils/DTO';

function filterObjectsById(objects: Data[] | undefined, arrStr: string[]): Data[] | undefined {
    const ids = arrStr.map(item => parseInt(item));
    const filterArr = objects?.filter(obj => ids.includes(obj.id));

    return filterArr;
}

export function Favorites() {
    const { favorites } = useAppSelector(state => state.favorites);
    const { data: books, isLoading } = useGetBooksFictionQuery('');
    const listBooks = filterObjectsById(books, favorites);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (favorites.length === 0 || !listBooks) return <h1>No favorite books</h1>

    return (
        <>
            <h1>Favorite</h1>
            <List list={listBooks} />
        </>
    )
}