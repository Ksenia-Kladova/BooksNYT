import './Form.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    title: string,
    handleClick: (email: string, pass: string) => void;
}

type FormData = {
    email: string
    password: string
}

export function Form({ title, handleClick }: Props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm<FormData>({ mode: 'all' });

    const onSubmit = () => reset();

    return (
        <div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input type="email"
                    {...register('email', {
                        required: 'required',
                    })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email'
                    autoComplete="email" />
                {errors?.email && <p className='form__error'>{errors?.email?.message}</p>}
                <input type="password"
                    {...register('password', {
                        required: 'required',
                        minLength: {
                            value: 6,
                            message: 'Password should be at least 6 characters'
                        }
                    })}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='password'
                    autoComplete="current-password" />
                {errors?.password && <p className='form__error'>{errors.password.message}</p>}
                <button onClick={() => handleClick(email, pass)} disabled={!isValid}>{title}</button>
            </form>
        </div>
    )
}