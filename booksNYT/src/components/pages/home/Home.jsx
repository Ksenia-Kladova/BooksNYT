import { List } from '../../list/List'
import { InputSearch } from '../../input-search/inputSearch'
import './Home.css';
import PropTypes from 'prop-types';
import { useGetBooksFictionQuery } from '../../../app/api';

export function Home() {
    const { data: books, isLoading } = useGetBooksFictionQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <InputSearch />
            <h1>Best Sellers</h1>
            <h2>Fiction</h2>
            <List list={books} />
        </div>
    )
}

Home.propTypes = {
    books: PropTypes.array
};