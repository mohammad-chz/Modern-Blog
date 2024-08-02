import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const path = useLocation().pathname;
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    }, [location]);

    const handleSignOut = async () => {
        try {
            const res = await fetch('api/user/signout', {
                method: 'POST',
            });
            if (!res) {
                console.log(date.message);
            } else {
                dispatch(signoutSuccess());
                navigate('/sign-in');
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    return (
        <Navbar className='border-b-2'>
            <Navbar.Toggle />
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>مشاور</span>
                چراغ زاده
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='سرچ کنید'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <Button className='lg:hidden w-12' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button
                    className='w-12 hidden sm:inline'
                    color="gray"
                    pill
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className='block text-sm'>{currentUser.username}@</span>
                            <span className='block text-sm font-bold truncate'>{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>مشخصات</DropdownItem>
                        </Link>
                        <DropdownDivider />
                        <DropdownItem onClick={handleSignOut}>
                            خروج از سیستم
                        </DropdownItem>
                    </Dropdown>
                ) :
                    (
                        <Link to='/sign-in'>
                            <Button gradientDuoTone='purpleToBlue' outline>
                                ورود
                            </Button>
                        </Link>
                    )
                }
            </div >
            <Navbar.Collapse>
                <Navbar.Link className='ml-8' active={path === '/'} as={'div'}>
                    <Link to='./' className='font-bold'>
                        خانه
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='./about' className='font-bold'>
                        درباره ما
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='./projects' className='font-bold'>
                        پروژه ها
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header