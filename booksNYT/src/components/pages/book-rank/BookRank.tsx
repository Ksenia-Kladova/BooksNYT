import './BookRank.css';
import { useSearchParams } from 'react-router-dom';
import { useGetSearchResultQuery } from '../../../app/api';
import type { DataSearch } from '../../../utils/DTO-search'

function processString(str: string): string {
    const equalsIndex = str.indexOf('=');
    const substringAfterEquals = str.substring(equalsIndex + 1);
    return substringAfterEquals.replace(/\+/g, ' ');
}

export default function BookRank() {
    const [searchParams] = useSearchParams();
    const search = searchParams + '';
    const { data: books } = useGetSearchResultQuery(search);
    const str: string = processString(search);
    const bookRank: DataSearch | undefined = books?.find(book => book.title === str);

    if (!bookRank) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='book-rank'>
            <div className='book-rank__wrap'>
                <h1 className='book-rank__title'>{bookRank.title}</h1>
                <span className='book-rank__author'>Author: {bookRank.author ?? 'no data available'}</span>
                <span className='book-rank__publisher'>Publisher: {bookRank.publisher ?? 'no data available'}</span>
                <p className='book-rank__description'>Description: {bookRank.description ?? 'no data available'} </p>
                <h2 className='book-rank__subtitle'>Ranks History: {bookRank.ranksHistory.length === 0 && 'no data available'}</h2>
                <table className='book-rank__table'>
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
                </table>
            </div>
        </div>
    )
}