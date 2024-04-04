import { Form } from "../../form/Form";
import { useAppDispatch } from '../../../hooks/redux-hook';
import { setUser } from '../../../app/store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


export function SignUp() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const handleSignUp = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
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
            <h1>Sign up for BooksNYT</h1>
            <Form title='Sign Up' handleClick={handleSignUp} />
        </div>
    )
}