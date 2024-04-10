import './Autocomplete.css';
import { Link } from 'react-router-dom';
import { useGetBooksFictionQuery } from '../../app/api';

type Props = {
    result: string
}

export function Autocomplete({ result }: Props) {
    const { data } = useGetBooksFictionQuery('');

    const newData = data?.filter(title => {
        return (
            title &&
            title.title &&
            title.title.toLowerCase().trim().includes(result)
        )
    });

    return (
        <div className='autocomplete'> {
            newData?.map(item =>
                <Link to={`/bookrank?title=${item.title}`}
                    className='autocomplete__item'
                    key={item.id}>{item.title}</Link>
            )}
        </div>
    )
}