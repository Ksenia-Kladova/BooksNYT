import './InputSearch.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { useDebounce } from '../../hooks/debounce';
import { selectQuery, setQuery } from '../../app/store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../hooks/use-auth';
import { SearchIcon } from '@chakra-ui/icons'

export function InputSearch() {
    const [showText, setShowText] = useState(false);
    const dispatch = useAppDispatch();
    const query = useAppSelector(selectQuery);
    const debounce = useDebounce(query);
    const navigate = useNavigate();
    const { isAuth, email } = useAuth();

    const emailRef = doc(db, "users", `${email}`);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate(query ? `/search?title=${query}` : '/', { replace: true });
        if (isAuth) {
            await updateDoc(emailRef, {
                history: arrayUnion(query)
            })
        }
    };

    let timeout: NodeJS.Timeout;
    const handleFocus = () => {
        setShowText(true);
        clearTimeout(timeout);
    };
    
    const handleBlur = () => {
        timeout = setTimeout(() => setShowText(false), 300);
    };

    const handleInputChange = (event: { target: { value: string; }; }) => {
        dispatch(setQuery(event.target.value));
    };

    return (
        <div className='InputSearch'>
            <div className='InputSearch__wrap'>
                <form className='InputSearch__form' onSubmit={handleSubmit}>
                    <label className='InputSearch__label' htmlFor="input">Find out the rating history</label>
                    <div className='InputSearch__wrapper'>
                        <input
                            className='InputSearch__input'
                            id='input'
                            type="search"
                            placeholder='Book title...'
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button className='InputSearch__button btn' type='submit' disabled={!query}><SearchIcon /></button>
                    </div>
                </form>
                {showText && <Autocomplete result={debounce} />}
            </div>
        </div >
    )
}