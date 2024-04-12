import { List } from '../../list/List'
import { InputSearch } from '../../input-search/inputSearch'
import { useGetBooksCategoryQuery } from '../../../app/api';
import { useBookCategory } from '../../select/SelectContext';

export default function Home() {
    const { selectedCategory } = useBookCategory();
    const { data, isLoading } = useGetBooksCategoryQuery(selectedCategory.value);

    if (data === undefined || isLoading) return (
        <div>
            <InputSearch />
            <h1>Best Sellers</h1>
            <h2>{selectedCategory.label}</h2>
            <p>Loading...</p>
        </div>
    )

    return (
        <div>
            <InputSearch />
            <h1>Best Sellers</h1>
            <h2>{selectedCategory.label}</h2>
            <List list={data} />
        </div>
    )
}

