import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import RecentPost from '../components/RecentPost';

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [])
  return (
    <div>
      <div className='flex flex-col max-w-6xl mx-auto gap-4 px-3 py-12'>
        <p className='text-2xl md:text-3xl font-bold'>به وبلاگ من خوش آمدید</p>
        <p className='text-sm md:text-base	'>در اینجا با مقاله و آموزش های مختلفی ماننده مشاوره ی کاری و درسی آشنا خواهید شد.</p>
        <Link to='/search'>
          <button className='text-start text-teal-500 hover:underline'>مشاهده همه پست ها</button>
        </Link>
      </div>
      <div className='bg-amber-100 dark:bg-gray-800 p-3'>
        <CallToAction />
      </div>
      <div className='mt-8 max-w-6xl mx-auto'>
        <h1 className='text-center text-2xl font-bold mb-4'>پست های اخیر</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-3'>
          {posts.map((post) => (
            <RecentPost key={post._id} post={post} />
          ))}
        </div>
            <Link to='/search'>
              <button className='text-teal-500 hover:underline w-full mb-4'>مشاهده همه پست ها</button>
            </Link>
      </div>
    </div>
  )
}

export default Home