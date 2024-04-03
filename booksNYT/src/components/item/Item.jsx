import './Item.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//функционал к кнопке избранное добавлю позднее

export function Item({ children }) {
    return (
        <>
            <Link to={`/${children.id}`}>
                <img src={children.image} alt='book cover' />
            </Link>
            <div className='wrap'>
                <h3 className='title'>{children.title}</h3>
                <span className='author'>{children.author}</span>
                <span className='publisher'>Publisher: {children.publisher}</span>
                <button>Add to favorites</button>
            </div>
        </>
    )
}

Item.propTypes = {
    children: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        publisher: PropTypes.string
    })).isRequired
};

Item.defaultProps = {
    author: '',
}