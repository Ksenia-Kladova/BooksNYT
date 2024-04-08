import './Autocomplete.css';
import { useNavigate } from 'react-router-dom';
import { useGetBooksFictionQuery } from '../../app/api';

type Props = {
    result: string
}

export function Autocomplete({ result }: Props) {
    const { data } = useGetBooksFictionQuery('');
    const navigate = useNavigate();

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
                <div className='autocomplete__item'
                    key={item.id}
                    onClick={() => navigate(`/bookrank?title=${item.title}`)}>{item.title}</div>
            )}
        </div>
    )
}