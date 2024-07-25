import React, { useEffect, useState } from 'react'
import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/theme/themeSlice';

const DashSidebar = () => {
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search]);
    const handleSignOut = async () => {
        try {
            const res = await fetch('api/user/signout', {
                method: 'POST',
            });
            if (!res) {
                console.log(date.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Sidebar className='w-full md:w-56'>
            <SidebarItems>
                <SidebarItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'مدیر' : 'کاربر'} labelColor='dark' as='div'>
                            مشخصات
                        </SidebarItem>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <SidebarItem active={tab === 'posts'} icon={HiDocumentText} as='div'>
                                نوشته ها
                            </SidebarItem>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=users'>
                            <SidebarItem active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                                کاربران
                            </SidebarItem>
                        </Link>
                    )}
                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        خروج از سیستم
                    </SidebarItem>
                    <div>
                        <Button
                            className='w-12 block sm:hidden'
                            color="gray"
                            pill
                            onClick={() => dispatch(toggleTheme())}
                        >
                            {theme === 'light' ? <FaSun /> : <FaMoon />}
                        </Button>
                    </div>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar >
    )
}

export default DashSidebar