import './Book.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dataFromDTO } from '../../../utils/DTO';

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

type BookStateType = BookType | {};

//функционал к кнопке избранное добавлю позднее

function findObj(id: string, arr: BookType[]) {
    return arr.find(book => book.id === parseInt(id))
}

export function Book() {
    const { id } = useParams<ParamType>();
    const [book, setBook] = useState<BookStateType>({});

    useEffect(() => {
        fetch(import.meta.env.VITE_FICTION)
            .then(response => response.json())
            .then(data => {
                const list = data.results.books;
                const listBooks = list.map(dataFromDTO);
                return listBooks;
            })
            .then(arr => {
                const obj = findObj(id, arr);
                setBook(obj);
            });
    }, [id]);

    return (
        <div className='book__wrap'>
            <img src={book.image} alt='book cover' />
            <div className='book__content'>
                <h3 className='book__title'>{book.title}</h3>
                <span className='book__author'>Author: {book.author}</span>
                <span className='book__publisher'>Publisher: {book.publisher}</span>
                <p className='book__description'>Description: {book.description}</p>
                <button>Add to favorites</button>
            </div>
        </div>)
}

