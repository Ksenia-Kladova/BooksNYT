import './Layout.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { removeUser } from '../../app/store/slices/userSlice';
import { SelectCategory } from '../select/Select';
import { SelectProvider } from '../select/SelectContext';
import { Suspense } from 'react';
import { setLoggedOut } from '../../app/store/slices/authenticationSlice';
import { checkUser } from '../../utils/checkUser';
import { useAuth } from '../../hooks/use-auth';
import { Spinner, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, Show, Hide, Box } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'

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
                    <div className='header__wrap'>
                        <div className='header__wrapper'>
                            <Link to={'/'}>Home</Link>
                            <SelectCategory />
                        </div>
                        <nav className='header__nav header__nav--login'>
                            <span>{email ? email : <Spinner size='sm' />}</span>
                            <Show breakpoint='(max-width: 576px)'>
                                <Menu >
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<HamburgerIcon />}
                                        variant='outline'
                                        size='sm'
                                    />
                                    <MenuList minWidth='110px'>
                                        <MenuItem >
                                            <Button className='header__nav-btn btn' size='sm' color='white' bg='gray' onClick={() => navigate('favorite')}>Favorites</Button>
                                        </MenuItem>
                                        <MenuItem  >
                                            <Button className='header__nav-btn btn' size='sm' color='white' bg='gray' onClick={() => navigate('history')}>History</Button>
                                        </MenuItem>
                                        <MenuItem >
                                            <Button className='header__nav-btn btn' size='sm' color='white' bg='gray' onClick={handlerClick} >Sign out</Button>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Show>
                            <Hide breakpoint='(max-width: 576px)'>
                                <Box className='header__box-btn'>
                                    <Button className='btn' size='sm' color='white' bg='gray' onClick={() => navigate('favorite')}>Favorites</Button>
                                    <Button className='btn' size='sm' color='white' bg='gray' onClick={() => navigate('history')}>History</Button>
                                    <Button className='btn' size='sm' color='white' bg='gray' onClick={handlerClick} >Sign out</Button>
                                </Box>
                            </Hide>
                        </nav>
                    </div>
                </header>
                <Suspense fallback={<Spinner size='xl' />}>
                    <Outlet />
                </Suspense>
            </>
        </SelectProvider>
    ) : (
        <SelectProvider>
            <>
                <header className='header'>
                    <div className='header__wrap'>
                        <div className='header__wrapper'>
                            <Link to={'/'}>Home</Link>
                            <SelectCategory />
                        </div>
                        <nav className='header__nav'>
                            <span className='header__guest'>Гость</span>
                            <Button className='btn' size='sm' color='white' bg='gray' onClick={() => navigate('signup')}>Sign up</Button>
                            <Button className='btn' size='sm' color='white' bg='gray' onClick={() => navigate('login')}>Sign in</Button>
                        </nav>
                    </div>
                </header>
                <Suspense fallback={<Spinner size='xl' />}>
                    <Outlet />
                </Suspense>
            </>
        </SelectProvider>
    )
}