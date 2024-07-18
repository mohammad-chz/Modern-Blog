import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../fireBase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formDate, setFormDate] = useState({});
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('لطفا یک تصویر را انتخاب کنید');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('آپلود تصویر انجام نشد');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormDate({ ...formDate, image: downloadURL })
                    });
                }
            );
        } catch (error) {
            setImageUploadError('آپلود تصویر انجام نشد');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-2xl font-bold'>یک پست ایجاد کنید</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='عنوان' required id='title' className='flex-1' />
                    <Select>
                        <option value='uncategorized'>یک دسته را انتخاب کنید</option>
                        <option value='curriculumCounseling'>مشاوره درسی</option>
                        <option value='businessAdvice'>مشاوره کاری</option>
                        <option value='otherThings'>موارد دیگر</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
                    <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                        {
                            imageUploadProgress ?
                                <div className='w-16 h-16'>
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                </div>
                                : 'بارگذاری تصویر'
                        }
                    </Button>
                </div>      
                {imageUploadError && (
                    <Alert color='failure'>
                        {imageUploadError}
                    </Alert>
                )}
                {formDate.image && (
                    <img src={formDate.image} alt='upload' className='w-full h-72 object-cover'/>
                )}
                <ReactQuill theme="snow" placeholder='یک چیزی بنویسید...' className='h-72 mb-12 rtl-editor' required />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    منتشر کردن
                </Button>
            </form>
        </div>
    )
}

export default CreatePost;