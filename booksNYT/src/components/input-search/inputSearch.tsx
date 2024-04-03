import './InputSearch.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '../autocomplete/Autocomplete';

export function InputSearch() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    return (
        <div className='InputSearch'>
            <div className='InputSearch__wrap'>
                <form className='InputSearch__form'>
                    <input
                        className='InputSearch__input'
                        type="text"
                        placeholder='Book title...'
                        onChange={event => setValue(event.target.value)}
                    />
                    <button className='InputSearch__button' type='submit'
                        onClick={() => navigate(value ? `search?title=${value}` : '/')}>find out the rating history</button>
                </form>
                <Autocomplete result={value} />
            </div>
        </div >
    )
}