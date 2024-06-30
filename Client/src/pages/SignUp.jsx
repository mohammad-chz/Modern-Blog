import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Oath from '../components/Oath';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
      
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('لطفاً تمام ورودی ها را پر نمایید.')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false)
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate('/sign-in');
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row gap-4 md:items-center p-3 max-w-3xl mx-auto'>
        {/* Right side */}
        <div className='flex-1'>
          <Link to='/' className='text-3xl sm:text-4xl font-bold dark:text-white'>
            <span className='px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>مشاور</span>
            چراغ زاده
          </Link>
          <p className='text-sm mt-5'>
            این یک نمونه از پروژه هست، شما میتوانید در اینجا با استفاده از نام کاربری ، پسورد یا ایمیل ثبت نام کنید.
          </p>
        </div>
        {/* Left side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='نام کاربری شما' />
              <TextInput
                type='text'
                placeholder='نام کاربری'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='ایمیل شما' />
              <TextInput
                type='email'
                placeholder='ایمیل'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='رمز عبور' />
              <TextInput
                type='password'
                placeholder='رمز عبور'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='mr-2'>درحال بارگذاری...</span>
                  </>
                ) : 'ثبت نام'
              }
            </Button>
            <Oath />
          </form>
          <div className='mt-2 text-sm'>
            <span>آیا حساب کاربری دارید؟</span>
            <Link to='/sign-in' className='text-blue-500 mr-1'>اینجا کلیک کنید</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-4' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp