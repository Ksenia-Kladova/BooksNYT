import './Book.css';

export function Book({ children }) {
    return (
        <div>
            <image crs={children.image} alt='book cover' />
            <div className='wrap'>
                <h3 className='title'>{children.title}</h3>
                <span className='author'>{children.author}</span>
                <span className='publisher'>Publisher: {children.publisher}</span>
                <p className='description'>{children.description}</p>
                <h4 className='subtitle'>Where to buy:</h4>
                <ul className='links'>
                    {children.links.map(item =>
                        <li className='list-item' key={item.id} >{
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                        }
                            console.log(key)
                        </li>
                    )}

                </ul>
                <button>Add to favorites</button>
            </div>

        </div>
    )
}