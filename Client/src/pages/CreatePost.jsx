import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleUploadImage = () => {
        if (!file) {
            setImageUploadError('لطفا یک تصویر را انتخاب کنید');
            return;
        }
        setImageUploadError(null);

        const formDataToSend = new FormData();
        formDataToSend.append('image', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/post/upload-image', true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                setImageUploadProgress(progress);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                setFormData(prevFormData => ({ ...prevFormData, image: data.filePath }));
                setImageUploadProgress(0); // Reset progress after successful upload
            } else {
                setImageUploadError('آپلود تصویر انجام نشد');
            }
        };

        xhr.onerror = () => {
            setImageUploadError('خطا در آپلود تصویر');
        };

        xhr.send(formDataToSend);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            
            setPublishError(null);
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-2xl font-bold'>یک پست ایجاد کنید</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='عنوان'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Select onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}>
                        <option value='uncategorized'>یک دسته را انتخاب کنید</option>
                        <option value='مشاوره-درسی'>مشاوره درسی</option>
                        <option value='مشاوره-کاری'>مشاوره کاری</option>
                        <option value='otherThings'>موارد دیگر</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
                    <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress > 0}>
                        {
                            imageUploadProgress > 0 ?
                                <div className='w-16 h-16'>
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
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
                {formData.image && (
                    <img src={`https://modern-blog-v7km.onrender.com${formData.image}`} alt='upload' className='w-full h-72 object-cover' />
                )}
                <ReactQuill
                    theme="snow"
                    placeholder='یک چیزی بنویسید...'
                    className='h-72 mb-12 rtl-editor'
                    required
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    منتشر کردن
                </Button>
            </form>
            {publishError && (
                <Alert className='mt-5'>
                    {publishError}
                </Alert>
            )}
        </div>
    );
};

export default CreatePost;
