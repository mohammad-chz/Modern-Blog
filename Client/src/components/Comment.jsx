import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Modal, Textarea } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const { currentUser } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [isDelete, setIsDelete] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [comment])
    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };
    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: editedContent }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm '>
            <div className="flex-shrink-0 ml-3">
                <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
            </div>
            <div className='flex-1 overflow-hidden'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>{user ? user.username : 'کاربر ناشناس'}@</span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ?
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end my-2">
                            <Button onClick={() => setIsEditing(false)} gradientDuoTone='purpleToBlue' size='sm' outline>کنسل</Button>
                            <Button onClick={handleSave} type='button' gradientDuoTone='purpleToBlue' size='sm'>ذخیره</Button>
                        </div>
                    </>
                    :
                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className="flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit">
                            {currentUser ?
                                <button
                                    type='button'
                                    onClick={() => onLike(comment._id)}
                                    className={`text-gray-400 hover:text-blue-500 ${comment.likes.includes(currentUser._id) && '!text-blue-500'}`}
                                >
                                    <FaThumbsUp className='text-sm' />
                                </button> :
                                <div>
                                    <Link to='/sign-in'>
                                        <FaThumbsUp className='text-sm hover:text-blue-500' />
                                    </Link>
                                </div>

                            }
                            {comment.numberOfLikes > 0 && (
                                <p className='text-gray-500'>
                                    {comment.numberOfLikes === 1
                                        ? `${comment.numberOfLikes} نفر این نظر را پسندید`
                                        : `${comment.numberOfLikes} نفر این نظر را پسندیدند`}
                                </p>)}
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button
                                        type='button'
                                        onClick={handleEdit}
                                        
                                        className='text-gray-400 hover:text-blue-500'>
                                        ویرایش
                                    </button>
                                    <button onClick={() => setIsDelete(true)} className='text-red-500'>
                                        حذف
                                    </button>
                                </>
                            )
                            }
                        </div>
                    </>
                }
            </div>
            {isDelete &&
                <Modal
                    show={isDelete}
                    onClose={() => setIsDelete(false)}
                    popup
                    size='md'
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>آیا مطمئن هستید که می خواهید پست خود را حذف کنید؟</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <Button color='failure' onClick={() => onDelete(comment._id)}>بله، مطمئنم
                            </Button>
                            <Button color='gray' onClick={() => setIsDelete(false)}>
                                نه، لغو شود
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}
export default Comment