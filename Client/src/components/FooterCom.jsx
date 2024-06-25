import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsTelegram, BsInstagram, BsTwitch } from 'react-icons/bs'

const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to='/' className='text-sm sm:text-lg font-bold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>مشاور</span>
              چراغ زاده
            </Link>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 mt-4 sm:gap-6'>
            <div>
              <Footer.Title title='درباره ما' />
              <Footer.LinkGroup col>
                <Footer.Link
                  className='margin-right'
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  مشاور درسی
                </Footer.Link>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  روش های جذب مشتری
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='ما را دنبال کنید' />
              <Footer.LinkGroup col>
                <Footer.Link
                  className='margin-right'
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  تماس با ما
                </Footer.Link>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  دریافت خبرهای جدید
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='مجاز' />
              <Footer.LinkGroup col>
                <Footer.Link
                  className='margin-right'
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  سیاست حفظ حریم خصوصی
                </Footer.Link>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  شرایط و ضوابط
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by=' علیرضا چراغ زاده' year={new Date().getFullYear()} />
          <div className='flex gap-8 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon className='hover:text-blue-400 transition' href='#' icon={BsFacebook} />
            <Footer.Icon className='hover:text-red-400 transition'  href='#' icon={BsInstagram} />
            <Footer.Icon className='hover:text-blue-400 transition'  href='#' icon={BsTelegram} />
            <Footer.Icon className='hover:text-purple-400 transition'  href='#' icon={BsTwitch} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterCom