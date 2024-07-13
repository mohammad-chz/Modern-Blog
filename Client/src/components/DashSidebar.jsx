import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

const DashSidebar = () => {
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
                <SidebarItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={'کاربر'} labelColor='dark' as='div'>
                            مشخصات
                        </SidebarItem>
                    </Link>
                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        خروج از سیستم
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar >
    )
}

export default DashSidebar