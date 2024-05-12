import './History.css';
import { useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useDatabaseHistory } from "../../../hooks/useDatabaseHistory";
import { deleteDataItemHistory } from '../../../utils/database';
import { useAppDispatch } from '../../../app/hooks';
import { setQuery } from '../../../app/store/slices/searchSlice';
import { Heading, Spinner } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'

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
        <main className='main'>
            <Heading as='h1' mb={2} fontFamily='fonts'>History</Heading>
            <Spinner />
        </main>
    )

    if (history.length === 0) return (
        <main className='main'>
            <Heading as='h1' mb={2} fontFamily='fonts'>History</Heading>
            <p>No search history</p>
        </main>
    )

    return (
        <main className='main'>
            <Heading as='h1' mb={2} fontFamily='fonts'>History</Heading>
            <ul className="history__list">
                {history.map(item =>
                    <li className="history__item" key={item} >{
                        <>
                            <button className='history__link' onClick={() => handlerClick(item)}>{item}</button>
                            <button className='history__btn' onClick={() => deleteDataItemHistory(email, item)}><DeleteIcon /></button>
                        </>
                    }</li>
                )}
            </ul>
        </main>
    )
}