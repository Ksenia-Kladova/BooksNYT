import { Form } from "../../form/Form";
import { useAppDispatch } from '../../../app/hooks';
import { setUser } from '../../../app/store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { setLoggedIn } from "../../../app/store/slices/authenticationSlice";
import { Heading } from '@chakra-ui/react';
import { useState } from "react";

export default function LogIn() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const [error, setError] = useState('');

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
            .catch((err) => {
                setError(err.message)
            });
        dispatch(setLoggedIn());
    }

    return (
        <main className="main">
            <Heading as='h1' mb={3} fontFamily='fonts' size='lg'>Sign in to BooksNYT</Heading>
            <Form title='Sign In' handleClick={handleLogin} error={error} />
        </main>
    )
}