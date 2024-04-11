import './Item.css';
import { Link } from 'react-router-dom';
import { ButtonFavorite } from '../buttonFavorite/ButtonFavorite'

type Props = {
    children: {
        id: number,
        image: string,
        title: string,
        author: string,
        publisher: string
    }
}

export function Item({ children }: Props) {
    return (
        <>
            <Link to={`/${children.id}`} className='link'>
                <img src={children.image} alt='book cover' />
            </Link>
            <div className='wrap'>
                <h3 className='title'>{children.title}</h3>
                <span className='author'>{children.author}</span>
                <span className='publisher'>Publisher: {children.publisher}</span>
                <ButtonFavorite id={`${children.id}`} />
            </div>
        </>
    )
}