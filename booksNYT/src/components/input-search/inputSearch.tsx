import './InputSearch.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { useDebounce } from '../../hooks/debounce';
import { setQuery } from '../../app/store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../hooks/use-auth';

export function InputSearch() {
    const [showText, setShowText] = useState(false);
    const dispatch = useAppDispatch();
    const query = useAppSelector(state => state.search.query);
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

    const handleFocus = () => {
        setShowText(true);
    };
    const handleBlur = () => {
        setTimeout(()=>setShowText(false), 500)
    };

    const handleInputChange = (event: { target: { value: string; }; }) => {
        dispatch(setQuery(event.target.value));
    };

    return (
        <div className='InputSearch'>
            <div className='InputSearch__wrap'>
                <form className='InputSearch__form' onSubmit={handleSubmit}>
                    <input
                        className='InputSearch__input'
                        type="search"
                        placeholder='Book title...'
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button className='InputSearch__button' type='submit' disabled={!query}>find out the rating history</button>
                </form>
                {showText && <Autocomplete result={debounce} />}
            </div>
        </div >
    )
}