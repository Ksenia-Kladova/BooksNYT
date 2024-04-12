import './History.css';
import { useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { Link } from "react-router-dom";
import { useDatabaseHistory } from "../../../hooks/useDatabaseHistory";
import { deleteDataItemHistory } from '../../../utils/database';

type HistoryItem = string;

export default function History() {
    const { email } = useAuth();
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useDatabaseHistory((dataUser) => {
        setHistory(dataUser.history);
    });

    return (
        <div>
            <h1>History</h1>
            <ul className="history__list">
                {history.map(item =>
                    <li className="history__item" key={item} >{
                        <>
                            <Link to={`/search?title=${item}`}>{item}</Link>
                            <button onClick={() => deleteDataItemHistory(email, item)}>remove from history</button>
                        </>
                    }</li>
                )}
            </ul>
        </div>
    )
}