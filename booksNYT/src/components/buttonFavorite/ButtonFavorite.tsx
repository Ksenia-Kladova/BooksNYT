import './ButtonFavorite.css';
import { useState } from "react";
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

type Props = {
    title: string
}

export function ButtonFavorite({ title }: Props) {
    const { isAuth, email } = useAuth();
    const navigate = useNavigate();
    const [isFav, SetIsFav] = useState(false);

    if (!isAuth) return <button className='button-favorite' onClick={() => navigate('/signup', { replace: true })}>Add to favorite</button>;

    const emailRef = doc(db, "users", `${email}`);

    function unsubscribe() {
        getDocs(collection(db, "users"))
            .then(res => res.docs.find(el => el.id === email))
            .then(a => a?.data())
            .then(list => {
                const favoriteList = list?.favorites
                SetIsFav(favoriteList.includes(title))
            })
    }

    async function addToFavorite() {
        await updateDoc(emailRef, {
            favorites: arrayUnion(title)
        });
        SetIsFav(true)
    }

    async function removeFromFavorite() {
        await updateDoc(emailRef, {
            favorites: arrayRemove(title)
        });
        SetIsFav(false)
    }

    unsubscribe()

    let className = "button-favorite button-favorite--remove";
    let titleButton = "Remove from favorite";
    let handleClick = removeFromFavorite;

    if (!isFav) {
        className = "button-favorite button-favorite--add";
        titleButton = "Add to favorite";
        handleClick = addToFavorite;
    }

    return (
        <button className={className} onClick={handleClick}>{titleButton}</button>
    )
}