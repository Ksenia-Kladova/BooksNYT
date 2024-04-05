import { Form } from "../../form/Form";
import { useAppDispatch } from '../../../hooks/redux-hook';
import { setUser } from '../../../app/store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


export function LogIn() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                }))
                navigate('/', { replace: true });
            })
            .catch(console.error)
    }

    return (
        <div>
            <h1>Sign in to BooksNYT</h1>
            <Form title='Sign In' handleClick={handleLogin} />
        </div>
    )
}