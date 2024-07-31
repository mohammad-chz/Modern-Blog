import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  const handleButtonClick = () => {
    window.open('https://video-call-puce.vercel.app/', '_blank', 'noopener,noreferrer');
  }
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className="flex flex-col justify-center flex-1">
        <h2 className='text-lg font-bold'>در اینجا یک متن برای کاربر جهت رویت میتوانید بنویسید</h2>
        <p className='text-gray-500 my-2'>در اینجا توضیحات تکمیلی به کاربر می دهید</p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounded-tl-xl rounded-bl-none'
          onClick={handleButtonClick}
        >
          توضیحات بیشتر
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://www.techpark.ir/storage/photos/7/%D8%AF%D9%88%D8%B1%D9%87-%D9%87%D8%A7%DB%8C-%D8%A2%D9%85%D9%88%D8%B2%D8%B4%DB%8C.jpg" />
      </div>
    </div>
  )
}

export default CallToAction