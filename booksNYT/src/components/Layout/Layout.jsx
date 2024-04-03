import './Layout.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';

export function Layout() {
    const navigate = useNavigate();
    return (
        <>
            <header className='header'>
                <Link to={'/'}>Home</Link>
                <button onClick={() => navigate('signin', { replace: false })}>Войти</button>
            </header>
            <Outlet />
        </>
    )
}