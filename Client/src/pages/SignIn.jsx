import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import Oath from '../components/Oath';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('لطفاً تمامی ورودی ها را پر نمایید'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            این یک نمونه از پروژه هست، شما میتوانید در اینجا با استفاده از پسورد و ایمیل وارد حساب کاربری خود شوید.
          </p>
        </div>
        {/* Left side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                placeholder='********'
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
            <span>آیا حساب کاربری ندارید؟</span>
            <Link to='/sign-up' className='text-blue-500 mr-1'>اینجا کلیک کنید</Link>
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

export default SignIn;