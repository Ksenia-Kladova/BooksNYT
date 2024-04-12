import './ButtonFavorite.css';
import { useState } from "react";
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { addDataFavorite, removeDataFavorite } from '../../utils/database';
import { useGetFavorites } from '../../hooks/useGetFavorites';

type Props = {
    title: string
}

export function ButtonFavorite({ title }: Props) {
    const { isAuth, email } = useAuth();
    const navigate = useNavigate();
    const [isFav, SetIsFav] = useState(false);

    useGetFavorites((dataUser) => {
        SetIsFav(dataUser.favorites.includes(title))
    }, title)

    if (!isAuth) return <button className='button-favorite' onClick={() => navigate('/signup', { replace: true })}>Add to favorite</button>;

    async function addToFavorite() {
        await addDataFavorite(email, title);
        SetIsFav(true);
    }

    async function removeFromFavorite() {
        await removeDataFavorite(email, title);
        SetIsFav(false);
    }

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