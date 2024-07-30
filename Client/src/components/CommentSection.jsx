import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import RecentPost from './RecentPost';

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [recentPosts, setRecentPoats] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
                });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments])
            }
        } catch (error) {
            setCommentError(error.message);
        }

    };
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`, {
                    method: "GET"
                });
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, [postId]);

    useEffect(() => {
        const getRecentPosts = async () => {
            const res = await fetch('/api/post/getposts?limit=3');
            const data = await res.json();
            setRecentPoats(data.posts);
        };
        getRecentPosts();
    }, []);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length,
                            }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };
    const handleDelete = async (commentId) => {
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setComments(comments.filter((c) => c._id !== commentId));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>ورود با: </p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="user image" />
                    <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                        {currentUser.username}@
                    </Link>
                </div>
            ) : (
                <div className='flex gap-1 text-sm text-teal-500 my-5'>
                    <p>برای گذاشتن نظر باید با اکانت خود وارد شوید.</p>
                    <Link className='text-blue-500 hover:underline' to='/sign-in'>ورود</Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea
                        placeholder='یک نظر اضافه کنید...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-xs'>{200 - comment.length} حرف باقی مانده است</p>
                        <Button
                            outline gradientDuoTone='purpleToBlue'
                            type='submit'
                        >
                            ارسال
                        </Button>
                    </div>
                    {commentError && <Alert className='mt-3' color='failure'>
                        {commentError}
                    </Alert>}
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>هنوز نظری ثبت نشده است!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>نظرات</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">{comments.length}</div>
                    </div>
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </>
            )}
            <div className='flex flex-col gap-4 sm:flex-row my-12'>
                {recentPosts.length > 0 && recentPosts.map((post) => (
                    <RecentPost key={post._id} post={post} />
                ))
                }
            </div>
        </div>
    )
}

export default CommentSection