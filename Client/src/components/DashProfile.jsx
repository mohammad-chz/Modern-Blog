import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-bold text-2xl'>مشخصات</h1>
            <form className='flex flex-col gap-4 md:w-96'>
                <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    <img
                        src={currentUser.profilePicture}
                        alt="user"
                        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
                    />
                </div>
                <TextInput type='text' id='username' placeholder='نام کاربری' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='پست الکترونیک' defaultValue={currentUser.email} />
                <TextInput type='password' id='password' placeholder='کلمه عبور' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    به روز رسانی
                </Button>
            </form>
            <div className='flex justify-between text-red-500 mt-5'>
                <span className='cursor-pointer'>حذف حساب کاربری</span>
                <span className='cursor-pointer'>خروج از سیستم</span>
            </div>
        </div>
    )
}

export default DashProfile