import './BookRank.css';
import { useSearchParams } from 'react-router-dom';
import { useGetSearchResultQuery } from '../../../app/api';
import type { DataSearch } from '../../../utils/DTO-search';
import { Heading, Spinner } from '@chakra-ui/react';

function processString(str: string): string {
    const equalsIndex = str.indexOf('=');
    const substringAfterEquals = str.substring(equalsIndex + 1);
    return substringAfterEquals.replace(/\+/g, ' ');
}

function replaceQuotes(str: string): string {
    if (str.startsWith("%22") && str.endsWith("%22")) {
        str = '"' + str.slice(3, -3) + '"';
    }

    str = str.replace(/%28/g, '(');
    str = str.replace(/%29/g, ')');
    str = str.replace(/%3/g, ': ');
    str = str.replace(/%2/g, '/');

    return str;
}

export default function BookRank() {
    const [searchParams] = useSearchParams();
    const search = searchParams + '';
    const { data: books } = useGetSearchResultQuery(search);
    const str: string = processString(search);

    const bookRank: DataSearch | undefined = books?.find(book => book.title === replaceQuotes(str));

    if (books && !bookRank) {
        return (
            <main className='main'>
                <Heading as='h1' mb={2} fontFamily='fonts'>No data</Heading>
            </main>
        )
    }

    if (!bookRank) {
        return (
            <main className='main'>
                <Spinner />
            </main>
        )
    }

    return (
        <div className='book-rank'>
            <div className='book-rank__wrap'>
                <Heading as='h1' size={['md', 'lg']} fontFamily='fonts' className='book-rank__title'>{bookRank.title}</Heading>
                <span className='book-rank__author'>Author: {bookRank.author ?? 'no data available'}</span>
                <span className='book-rank__publisher'>Publisher: {bookRank.publisher ?? 'no data available'}</span>
                <p className='book-rank__description'>Description: {bookRank.description ?? 'no data available'} </p>
                <Heading as='h2' fontFamily='fonts' size='md' fontWeight={400} className='book-rank__subtitle'>Ranks History: </Heading>
                {(bookRank.ranksHistory.length === 0) ? <span>no data available</span> : <table className='book-rank__table'>
                    <thead className='book-rank__table-head'>
                        <tr>
                            <td>Category</td>
                            <td>Rank</td>
                            <td>Published date</td>
                        </tr>
                    </thead>
                    <tbody >{
                        bookRank.ranksHistory.map((item, index) =>
                            <tr key={index} >
                                <td >{item.display}</td>
                                <td className='book-rank__rank'>{item.rank}</td>
                                <td><time dateTime={item.publishedDate}>{item.publishedDate}</time></td>
                            </tr>)}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}