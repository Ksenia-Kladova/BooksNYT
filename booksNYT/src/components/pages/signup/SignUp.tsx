import { Form } from "../../form/Form";
import { useAppDispatch } from '../../../app/hooks';
import { setUser } from '../../../app/store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { setLoggedIn } from "../../../app/store/slices/authenticationSlice";
import { Heading } from '@chakra-ui/react';
import { useState } from "react";
import type { AuthError } from "firebase/auth";

export default function SignUp() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const [error, setError] = useState('');

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
            .catch((err: AuthError) => {
                setError(err.code)
            });
        try {
            setDoc(doc(db, "users", email), {
                history: [],
                favorites: []
            });
        } catch (e) {
            setError(`${e}`);
        }

        dispatch(setLoggedIn());
    }

    return (
        <main className="main">
            <Heading mb={3} fontFamily='fonts' size='lg'>Sign up for BooksNYT</Heading>
            <Form title='Sign Up' handleClick={handleSignUp} error={error} />
        </main>
    )
}