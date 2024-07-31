import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaUsers, FaArrowUp, FaComments } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
    const { currentUser } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5');
                const data = await res.json();
                setUsers(data.users);
                setTotalUsers(data.totalUsers);
                setLastMonthUsers(data.lastMonthUsers)
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts');
                const data = await res.json();
                setPosts(data.posts);
                setTotalPosts(data.totalPosts);
                setLastMonthPosts(data.lastMonthPosts)
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5&sort=desc');
                const data = await res.json();
                setComments(data.comments);
                setTotalComments(data.totalComments);
                setLastMonthComments(data.lastMonthComments)
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);
    return (
        <div className='w-full p-2 sm:p-10'>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center ">
                <div className="text-slate-500 dark:text-slate-200 dark:shadow-blue-500/50 shadow-lg w-full py-3 px-6 rounded-md">
                    <div className="flex justify-between  mb-3">
                        <div className='flex sm:flex-col gap-1'>
                            <p className='text-xl'>کل کاربران</p>
                            <p className='text-xl text-black dark:text-white font-bold'>{totalUsers}</p>
                        </div>
                        <div>
                            <FaUsers className='w-12 h-12 bg-teal-500 rounded-full p-3 text-white' />
                        </div>
                    </div>
                    <div className='flex'>
                        <FaArrowUp className='text-teal-500 ml-1 text-sm' />
                        <p className='text-teal-500 text-sm'>{lastMonthUsers}</p>
                        <p className="mr-2 text-sm">ماه گذشته</p>
                    </div>
                </div>

                <div className="text-slate-500 shadow-lg dark:shadow-blue-500/50 w-full dark:text-slate-200 py-3 px-6 rounded-md">
                    <div className="flex justify-between mb-3">
                        <div className='flex sm:flex-col gap-1'>
                            <p className='text-xl'>کل پست ها</p>
                            <p className='text-xl text-black dark:text-white font-bold'>{totalPosts}</p>
                        </div>
                        <div>
                            <FaComments className='w-12 h-12 bg-blue-500 rounded-full p-3 text-white' />
                        </div>
                    </div>
                    <div className='flex'>
                        <FaArrowUp className='text-teal-500 ml-1 text-sm' />
                        <p className='text-teal-500 text-sm'>{lastMonthPosts}</p>
                        <p className="mr-2 text-sm">ماه گذشته</p>
                    </div>
                </div>

                <div className="text-slate-500 dark:text-slate-200 shadow-lg dark:shadow-blue-500/50 w-full py-3 px-6 rounded-md">
                    <div className="flex justify-between  mb-3">
                        <div className='flex sm:flex-col gap-1'>
                            <p className='text-xl'>کل نظرات</p>
                            <p className='text-xl text-black dark:text-white font-bold'>{totalComments}</p>
                        </div>
                        <div>
                            <MdLocalPostOffice className='w-12 h-12 bg-green-500 rounded-full p-3 text-white' />
                        </div>
                    </div>
                    <div className='flex'>
                        <FaArrowUp className='text-teal-500 ml-1 text-sm' />
                        <p className='text-teal-500 text-sm'>{lastMonthComments}</p>
                        <p className="mr-2 text-sm">ماه گذشته</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mb-4 md:flex-row justify-center gap-4 mt-5 md:p-4 md:px-[4%] md:py-12'>
                <div className="shadow-lg basis-1/3  p-6 rounded-sm dark:shadow-blue-500/50">
                    <div className="flex justify-between items-center mb-6">
                        <p className='font-bold'>نظرات اخیر</p>
                        <Link to='/dashboard?tab=users'>
                            <Button className='font-bold' gradientDuoTone='purpleToPink' outline>
                                مشاهده همه کاربران
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <div className='flex justify-between mb-6 font-bold'>
                            <p>عکس کاربر</p>
                            <p>نام کاربری</p>
                        </div>
                        {users && users.map((user) => (
                            <div key={user._id} className='flex justify-between items-center mb-8'>
                                <img className='w-10 h-10 rounded-full' src={user.profilePicture} alt="user's image" />
                                <p>{user.username}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="shadow-lg basis-2/3  p-6 rounded-sm dark:shadow-blue-500/50">
                    <div className="flex justify-between font-bold mb-6">
                        <p>کاربران اخیر</p>
                        <Link to='/dashboard?tab=comments'>
                            <Button className='font-bold' gradientDuoTone='purpleToPink' outline>
                                مشاهده همه نظرات
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <div className='flex justify-between font-bold mb-6'>
                            <p>نظر</p>
                            <p>تعدا لایک</p>
                        </div>
                        {comments && comments.map((comment) => (
                            <div key={comment._id} className='flex justify-between items-center mb-8'>
                                <p className='truncate w-36 md:w-52'>{comment.content}</p>
                                <p>{comment.numberOfLikes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="shadow-lg p-6 rounded-sm dark:shadow-blue-500/50">
                    <div className="flex justify-between font-bold mb-6">
                        <p>کاربران اخیر</p>
                        <Link to='/dashboard?tab=posts'>
                            <Button className='font-bold' gradientDuoTone='purpleToPink' outline>
                                مشاهده همه پست ها
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <div className='flex justify-between font-bold mb-6'>
                            <p>تصویر پست</p>
                            <p>موضوع</p>
                        </div>
                        {posts && posts.map((post) => (
                            <div key={post._id} className='flex justify-between items-center mb-8'>
                                <img className='w-10 h-10 rounded-full' src={post.image} alt="user's image" />
                                <p>{post.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    )
}

export default DashboardAdmin