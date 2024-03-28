import './Layout.css'
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <>
            <header className='header'>
                <Link to={'/'}>Home</Link>
            </header>
            <Outlet />
        </>
    )
}