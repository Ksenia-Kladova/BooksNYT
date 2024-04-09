import './ButtonFavorite.css';
import { useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux-hook";
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

type Props = {
    id: string
}

export function ButtonFavorite({ id }: Props) {
    const { favorites } = useAppSelector(state => state.favorites);
    const [isFav, SetIsFav] = useState(favorites.includes(id));
    const { addFavorite, removeFavorite } = useActions();
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    function addToFavorite(event: React.MouseEvent<HTMLButtonElement>) {
        addFavorite(id)
        SetIsFav(true)
    }

    function removeFromFavorite(event: React.MouseEvent<HTMLButtonElement>) {
        removeFavorite(id)
        SetIsFav(false)
    }

    if (!isAuth) return <button className='button-favorite' onClick={() => navigate('signup')}>Add to favorite</button>

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