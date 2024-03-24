import { List } from '../../list/List.jsx'
import './Home.css';
import { useEffect, useState } from 'react';
import { dataFromDTO } from '../../../utils/DTO'

export function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_FICTION)
            .then(response => response.json())
            .then(data => {
                const list = data.results.books;
                const listBooks = list.map(dataFromDTO)

                setBooks(listBooks);
            });
    }, []);

    return (
        <div>
            <h1>Best Sellers</h1>
            <h2>Fiction</h2>
            <List list={books} />
        </div>
    )
}