import './Layout.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { removeUser } from '../../app/store/slices/userSlice';
import { Select } from '../select/Select';
import { SelectProvider } from '../select/SelectContext';
import { Suspense } from 'react';
import { setLoggedOut } from '../../app/store/slices/authenticationSlice';
import { checkUser } from '../../utils/checkUser';
import { useAuth } from '../../hooks/use-auth';

export default function Layout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { email } = useAuth();
    const login = checkUser();

    const handlerClick = () => {
        dispatch(removeUser());
        dispatch(setLoggedOut());
    }

    return login ? (
        <SelectProvider>
            <>
                <header className='header'>
                    <Link to={'/'}>Home</Link>
                    <Select />
                    <div className='header__wrap'>
                        <span>{email ? email : 'Loading...'}</span>
                        <button onClick={() => navigate('favorite')}>Favorites</button>
                        <button onClick={() => navigate('history')}>History</button>
                        <button onClick={handlerClick} >Sign out</button>
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