import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
const Header = () => {
    const path = useLocation().pathname;
    return (
        <Navbar className='border-b-2'>
            <Navbar.Toggle />
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>مشاور</span>
                چراغ زاده
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='سرچ کنید'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='lg:hidden w-12' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 hidden sm:inline' color="gray" pill>
                    <FaMoon />
                </Button>
                <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        ورود
                    </Button>
                </Link>
            </div>
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
        </Navbar>
    )
}

export default Header