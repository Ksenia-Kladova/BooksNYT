import './Search.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetSearchResultQuery } from '../../../app/api';
import { InputSearch } from '../../input-search/inputSearch';
import { Heading } from '@chakra-ui/react';

export default function Search() {
    const [searchParams] = useSearchParams();
    const search: string = searchParams + '';
    const { data: books } = useGetSearchResultQuery(search);
    const searchTitle = search.substring(6);

    if (search === '') return;

    if (books?.length === 0) {
        return (
            <>
                <InputSearch />
                <main className='main'>
                    <Heading as='h1' mb={2} fontFamily='fonts'>Not found </Heading>
                    <span>Try again</span>
                </main>
            </>
        )
    }

    return (
        <>
            <InputSearch />
            <main className='main'>
                <Heading as='h1' mb={2} fontFamily='fonts' className='search__title'>Search results: {searchTitle}</Heading>
                <ul className='search__list'>
                    {books?.map(item =>
                        <li className='search__item' key={item.id} >{
                            <Link to={`/bookrank?title=${item.title}`}>
                                <div className='search__wrap'>
                                    <h3 className='search__subtitle'>Title: {item.title}</h3>
                                    <span className='search__author'>Author: {item.author ?? 'no data available'}</span>
                                    <span className='search__publisher'>Publisher: {item.publisher ?? 'no data available'}</span>
                                </div>
                            </Link>}
                        </li>)}
                </ul>
            </main>
        </>
    )
}