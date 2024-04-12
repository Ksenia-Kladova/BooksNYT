import './Layout.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../hooks/redux-hook';
import { removeUser } from '../../app/store/slices/userSlice';
import { Select } from '../select/Select';
import { SelectProvider } from '../select/SelectContext';
import { Suspense } from 'react';

export default function Layout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth, email } = useAuth();

    return isAuth ? (
        <SelectProvider>
            <>
                <header className='header'>
                    <Link to={'/'}>Home</Link>
                    <Select />
                    <div className='header__wrap'>
                        <span>{email}</span>
                        <button onClick={() => navigate('favorite')}>Favorites</button>
                        <button onClick={() => navigate('history')}>History</button>
                        <button onClick={() => dispatch(removeUser())} >Sign out</button>
                    </div>
                </header>
                <Suspense fallback={<p>Loading...</p>}>
                    <Outlet />
                </Suspense>
            </>
        </SelectProvider>
    ) : (
        <SelectProvider>
            <>
                <header className='header'>
                    <Link to={'/'}>Home</Link>
                    <Select />
                    <div className='header__wrap'>
                        <span>Гость</span>
                        <button onClick={() => navigate('signup')}>Sign up</button>
                        <button onClick={() => navigate('login')}>Sign in</button>
                    </div>
                </header>
                <Suspense fallback={<p>Loading...</p>}>
                    <Outlet />
                </Suspense>
            </>
        </SelectProvider>
    )
}