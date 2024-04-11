import { List } from '../../list/List'
import { InputSearch } from '../../input-search/inputSearch'
import PropTypes from 'prop-types';
import { useGetBooksCategoryQuery } from '../../../app/api';
import { useBookCategory } from '../../select/SelectContext';

export default function Home() {
    const { selectedCategory } = useBookCategory();
    const { data: books } = useGetBooksCategoryQuery(selectedCategory.value);

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