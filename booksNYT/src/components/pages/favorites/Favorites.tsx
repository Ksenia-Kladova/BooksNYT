import { List } from '../../list/List';
import type { Data } from '../../../utils/DTO';
import { useState } from "react";
import { useBookCategory } from "../../select/SelectContext";
import { useGetBooksCategoryQuery } from "../../../app/api";
import { useDatabaseFavorites } from '../../../hooks/useDatabaseFavorites';
import { Heading, Spinner } from '@chakra-ui/react';

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

    if (books === undefined) return <main className='main'><Spinner /> </main >;

    const listBooks = filterObjectsByTitle(books, fav);

    if (fav.length === 0) return (
        <main className='main'>
            <Heading as='h1' mb={2} fontFamily='fonts'>Favorite</Heading>
            <Heading as='h2' fontFamily='fonts' size='lg' fontWeight={400}>{selectedCategory.label}</Heading>
            <p>No favorite books</p>
        </main>
    )

    return (
        <main className='main'>
            <Heading as='h1' mb={2} fontFamily='fonts'>Favorite</Heading>
            <Heading as='h2' fontFamily='fonts' size='lg' fontWeight={400}>{selectedCategory.label}</Heading>
            {listBooks ? <List list={listBooks} /> : <Spinner />}
        </main>
    )
}