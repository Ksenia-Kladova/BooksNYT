import { List } from '../../list/List'
import { InputSearch } from '../../input-search/inputSearch'
import { useGetBooksCategoryQuery } from '../../../app/api';
import { useBookCategory } from '../../select/SelectContext';
import { Text, Spinner } from '@chakra-ui/react';

export default function Home() {
    const { selectedCategory } = useBookCategory();
    const { data, isLoading } = useGetBooksCategoryQuery(selectedCategory.value);

    if (data === undefined || isLoading) return (
        <div>
            <InputSearch />
            <Text as='h1' textStyle='h1'>Best Sellers</Text>
            <Text textStyle='h2'>{selectedCategory.label}</Text>
            <Spinner size='xl' />
        </div>
    )

    return (
        <>
            <InputSearch />
            <main className='main'>
                <Text as='h1' textStyle='h1'>Best Sellers</Text>
                <Text textStyle='h2'>{selectedCategory.label}</Text>
                <List list={data} />
            </main>
        </>
    )
}

