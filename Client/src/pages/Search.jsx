import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecentPost from '../components/RecentPost';

const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized'
    });
    console.log(sidebarData)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFormUrl = urlParams.get('sort');
        const category = urlParams.get('category');
        if (searchTermFromUrl || sortFormUrl || category) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFormUrl,
                category: category
            })
        }
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/post/getposts?${searchQuery}`);
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setLoading(false);
                    if (data.posts.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                setLoading(false);
                console.log(error.message);
            }
        };
        fetchPosts();
    }, [location.search]);
    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({ ...sidebarData, category: category });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }
    };
    return (
        <div className='flex flex-col md:flex-row '>
            <div className="p-7 border-b md:border-l md:min-h-screen border-gray-500">
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-bold'>عبارت جستجو:</label>
                        <TextInput
                            placeholder='سرچ...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-bold'>مرتب سازی:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value="desc">آخرین</option>
                            <option value="asc">قدیمی ترین</option>

                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-bold'> دسته بندی:</label>
                        <Select onChange={handleChange} value={sidebarData.category} id='category'>
                            <option value='uncategorized'>یک دسته را انتخاب کنید</option>
                            <option value='مشاوره-درسی'>مشاوره درسی</option>
                            <option value='businessAdvice'>مشاوره کاری</option>
                            <option value='otherThings'>موارد دیگر</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>
                        فیلتر
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className='text-xl font-bold text-center p-3 mt-5 md:border-b border-r-gray-500'>نتیجه جستجو:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='font-bold text-gra-500'>هیچ پستی یافت نشد.</p>
                    )}
                    {
                        loading && (
                            <p className='text-gray-500'>در حال جستجو...</p>
                        )
                    }
                    {!loading && posts && posts.map((post) => (
                        <RecentPost post={post} />
                    ))}
                </div>
                {showMore && (
                    <button
                        onClick={handleShowMore}
                        className='text-teal-500 hover:underline p-7 w-full'
                    >
                        بیشتر
                    </button>
                )}
            </div>
        </div>
    )
}

export default Search