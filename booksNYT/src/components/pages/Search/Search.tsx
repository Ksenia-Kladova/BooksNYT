import './Search.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetSearchResultQuery } from '../../../app/api';
import { InputSearch } from '../../input-search/inputSearch'

export default function Search() {
    const [searchParams] = useSearchParams();
    const search: string = searchParams + '';
    const { data: books } = useGetSearchResultQuery(search);

    if (search === '') return;

    if (books?.length === 0) {
        return (
            <div>
                <h1>Not found </h1>
                <span>Try again</span>
            </div>
        )
    }

    return (
        <div>
            <InputSearch />
            <h1 className='search__title'>Search results</h1>
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
        </div>
    )
}