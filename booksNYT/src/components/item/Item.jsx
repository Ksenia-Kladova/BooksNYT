import './Item.css';
import PropTypes from 'prop-types';

//функционал к кнопке избранное добавлю позднее

export function Item({ children }) {
    return (
        <>
            <img src={children.image} alt='book cover' />
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
        image: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        publisher: PropTypes.string
    })).isRequired
};