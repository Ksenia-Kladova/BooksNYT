import { useAppSelector } from './redux-hook';

export function useAuth() {
    const {email, password, id} = useAppSelector(state => state.user);

    return {
        isAuth: !!id,
        email,
        password,
        id
    }
}