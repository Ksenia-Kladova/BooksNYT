import './History.css';
import { useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useDatabaseHistory } from "../../../hooks/useDatabaseHistory";
import { deleteDataItemHistory } from '../../../utils/database';
import { useAppDispatch } from '../../../app/hooks';
import { setQuery } from '../../../app/store/slices/searchSlice';

type HistoryItem = string;

export default function History() {
    const { email } = useAuth();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useDatabaseHistory((dataUser) => {
        setHistory(dataUser.history);
    });

    function handlerClick(title: string) {
        dispatch(setQuery(title))
        navigate(`/search?title=${title}`)
    }

    if (history === undefined) return (
        <>
            <h1>History</h1>
            <p>Loading...</p>
        </>
    )

    if (history.length === 0) return (
        <>
            <h1>History</h1>
            <p>No search history</p>
        </>
    )

    return (
        <>
            <h1>History</h1>
            <ul className="history__list">
                {history.map(item =>
                    <li className="history__item" key={item} >{
                        <>
                            <button className='history__link' onClick={() => handlerClick(item)}>{item}</button>
                            <button onClick={() => deleteDataItemHistory(email, item)}>remove from history</button>
                        </>
                    }</li>
                )}
            </ul>
        </>
    )
}