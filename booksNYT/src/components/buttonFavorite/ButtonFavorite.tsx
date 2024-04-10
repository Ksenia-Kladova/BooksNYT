import './ButtonFavorite.css';
import { useState } from "react";
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

type Props = {
    id: string
}

export function ButtonFavorite({ id }: Props) {
    const { isAuth, email } = useAuth();
    const navigate = useNavigate();
    const [isFav, SetIsFav] = useState(false);

    if (!isAuth) return <button className='button-favorite' onClick={() => navigate('signup')}>Add to favorite</button>;

    const emailRef = doc(db, "users", `${email}`);

    getDocs(collection(db, "users"))
        .then(res => res.docs.find(el => el.id === email))
        .then(a => a?.data())
        .then(list => {
            const favoriteList = list?.favorites
            SetIsFav(favoriteList.includes(id))
        })

    async function addToFavorite() {
        await updateDoc(emailRef, {
            favorites: arrayUnion(id)
        });
        SetIsFav(true)
    }

    async function removeFromFavorite() {
        await updateDoc(emailRef, {
            favorites: arrayRemove(id)
        });
        SetIsFav(false)
    }

    let className = "button-favorite button-favorite--remove";
    let title = "Remove from favorite";
    let handleClick = removeFromFavorite;

    if (!isFav) {
        className = "button-favorite button-favorite--add";
        title = "Add to favorite";
        handleClick = addToFavorite;
    }

    return (
        <button className={className} onClick={handleClick}>{title}</button>
    )
}