import './History.css';
import { useEffect, useState } from "react";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../hooks/use-auth";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";

export function History() {
    const { email } = useAuth();
    const emailRef = doc(db, "users", `${email}`);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getDoc(emailRef)
            .then(res => res.data())
            .then(data => setHistory(data?.history))
    }, [setHistory]);

    return (
        <div>
            <h1>History</h1>
            <ul className="history__list">
                {history.map(item =>
                    <li className="history__item" key={item} >{
                        <>
                            <Link to={`/search?title=${item}`}>{item}</Link>
                            <button onClick={async () => {
                                await updateDoc(emailRef, { history: arrayRemove(item) })
                            }}>remove from history</button>
                        </>
                    }</li>
                )}
            </ul>
        </div>
    )
}