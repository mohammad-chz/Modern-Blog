import { Alert, Button, Modal, ModalHeader, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../fireBase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

const DashProfile = () => {
    const { currentUser, error } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setImageFileUploadError('تصویر باید کمتر از 2 مگابایت باشد');
                return;
            }
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])
    const uploadImage = async () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploading(true)
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadError('Could not upload image');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                })
            }
        )
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            return setUpdateUserError('هیچ تغییری ایجاد نشد');
        }
        if (imageFileUploading) {
            return setUpdateUserError('لطفا منتظر بمانید تا تصویر آپلود شود');
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess('نمایه کاربر با موفقیت به روز شد');
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    };

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserFailure(data.message));
            }else {
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-bold text-2xl'>مشخصات</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:w-96'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                },
                                path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` }
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
                    />
                </div>
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
                <TextInput type='text' id='username' placeholder='نام کاربری' defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='پست الکترونیک' defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='کلمه عبور' onChange={handleChange} />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline className='font-bold'>
                    به روز رسانی
                </Button>
            </form>
            <div className='flex justify-between text-red-500 mt-5'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>حذف حساب کاربری</span>
                <span className='cursor-pointer'>خروج از سیستم</span>
            </div>
            {updateUserSuccess && (
                <Alert className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert className='mt-5' color='failure'>
                    {updateUserError}
                </Alert>
            )}
            {error && (
                <Alert className='mt-5' color='failure'>
                    {error}
                </Alert>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>آیا مطمئن هستید که می خواهید اکانت خود را حذف کنید؟</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <Button color='failure' onClick={handleDeleteUser}>بله، مطمئنم
                        </Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>
                            نه، لغو شود
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashProfile