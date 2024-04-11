import './Book.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dataFromDTO } from '../../../utils/DTO';
import { useBookCategory } from '../../select/SelectContext';
import { ButtonFavorite } from '../../buttonFavorite/ButtonFavorite';

type BookType = {
    id: number;
    image: string;
    title: string;
    author: string;
    publisher: string;
    description: string;
    links: {
        url: string;
        name: string;
    }[];
}

type ParamType = {
    id: string;
}

function findObj(id: string, arr: BookType[]) {
    return arr.find(book => book.id === parseInt(id, 10))
}

export default function Book() {
    const { id } = useParams<ParamType>();
    const bookState: BookType = {
        id: 0,
        image: '',
        title: '',
        author: '',
        publisher: '',
        description: '',
        links: []
    };
    const [book, setBook] = useState<BookType>(bookState);
    const { selectedCategory } = useBookCategory();

    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${selectedCategory.value}.json?${import.meta.env.VITE_KEY}`)
            .then(response => response.json())
            .then(data => {
                const list = data.results.books;
                const listBooks = list.map(dataFromDTO);
                return listBooks;
            })
            .then(arr => {
                const obj = findObj(id!, arr);
                setBook(obj!);
            });
    }, [id, selectedCategory]);

    if (!id) {
        return <h1>Error</h1>
    }

    return (
        <div className='book__wrap'>
            <img src={book.image} alt='book cover' /><div className='book__content'>
                <h3 className='book__title'>{book.title}</h3>
                <span className='book__author'>Author: {book.author}</span>
                <span className='book__publisher'>Publisher: {book.publisher}</span>
                <p className='book__description'>Description: {book.description}</p>
                <h4 className='book__subtitle'> Links to buy the book:</h4>
                <ul className='book__links'>
                    {book.links.map(item =>
                        <li className='book__list-item' key={book.id} >{
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                        }</li>
                    )}
                </ul>
                <ButtonFavorite id={id} />
            </div>
        </div>)
}

