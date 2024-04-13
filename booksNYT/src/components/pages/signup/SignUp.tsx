import { Form } from "../../form/Form";
import { useAppDispatch } from '../../../app/hooks';
import { setUser } from '../../../app/store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export default function SignUp() {
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
                console.log(user)
            })
            .catch(console.error);
        try {
            setDoc(doc(db, "users", email), {
                history: [],
                favorites: []
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <h1>Sign up for BooksNYT</h1>
            <Form title='Sign Up' handleClick={handleSignUp} />
        </div>
    )
}