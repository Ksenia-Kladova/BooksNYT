import './Book.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dataFromDTO } from '../../../utils/DTO';
import { useBookCategory } from '../../select/SelectContext';
import { ButtonFavorite } from '../../buttonFavorite/ButtonFavorite';
import { Heading, Image, Spinner } from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon, ChevronDownIcon } from '@chakra-ui/icons'

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
    const [isLinksVisible, setIsLinksVisible] = useState(false);

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

    const handleClick = () => {
        setIsLinksVisible(!isLinksVisible);
    };

    console.log(isLinksVisible);

    if (!id) {
        return <h1>Error</h1>
    }

    return (
        <main className='book__wrap main'>
            {book.image ? <Image src={book.image} alt='book cover' /> : <Spinner size='xl' />}
            <div className='book__content'>
                <Heading as='h1' size={['sm', 'md', 'lg']} fontFamily='Cardo' className='book__title'>{book.title}</Heading>
                <span className='book__author'>Author: {book.author}</span>
                <span className='book__publisher'>Publisher: {book.publisher}</span>
                <p className='book__description'>Description: {book.description}</p>
                <Heading as='h4' size='sm' fontFamily='Cardo' className='book__subtitle' onClick={handleClick}> Links to buy the book <ChevronDownIcon className='book__subtitle-svg' /></Heading>
                <ul className={isLinksVisible ? 'book__links book__links--active' : 'book__links'}>
                    {book.links.map((item, index) =>
                        <li className='book__list-item' key={index} >{
                            <Link href={item.url} color='gray' target="_blank" rel="noopener noreferrer" isExternal>{item.name} <ExternalLinkIcon mx='2px' /></Link>
                        }</li>
                    )}
                </ul>
                <ButtonFavorite title={book.title} />
            </div>
        </main>)
}

