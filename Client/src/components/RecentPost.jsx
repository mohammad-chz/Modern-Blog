import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const RecentPost = ({ post }) => {
    return (
        <Link
            to={`/post/${post.slug}`}
            className='flex flex-1 flex-col items-center gap-2 justify-center
             border border-teal-500 p-4 rounded-md hover:scale-105 transition-all duration-300'
        >
            <img className='h-48 bg-cover' src={`https://modern-blog-v7km.onrender.com${post.image}`} alt="image for Post" />
            <p className='text-gray-700 font-bold'>{post.title}</p>
            <div className='flex'>
                <p className='text-xs'>دسته بندی:</p>
                <p className='text-xs'>{post.category}</p>
            </div>
            <Link to={`/post/${post.slug}`} className='w-full'>
                <Button className='w-full' gradientDuoTone='purpleToBlue'>بیشتر بخوانید</Button>
            </Link>
        </Link>
    )
}

export default RecentPost