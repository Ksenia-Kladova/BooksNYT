import { List } from '../../list/List'
import { InputSearch } from '../../input-search/inputSearch'
import PropTypes from 'prop-types';
import { useGetBooksCategoryQuery } from '../../../app/api';
import { useBookCategory } from '../../select/SelectContext';

export function Home() {
    const { selectedCategory } = useBookCategory();
    const { data: books, isLoading } = useGetBooksCategoryQuery(selectedCategory.value);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <InputSearch />
            <h1>Best Sellers</h1>
            <h2>{selectedCategory.label}</h2>
            <List list={books} />
        </div>
    )
}

Home.propTypes = {
    books: PropTypes.array
};