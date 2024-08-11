import React from 'react'
import logo from '../assets/logo.png'
import light from '../assets/light.png'
import night from '../assets/night.png'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../store/themeSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Navbar() {

  const {register,handleSubmit} = useForm();

  const mode = useSelector(state => state.theme.mode)
  const isLogged = useSelector(state => state.auth.authStatus)
  const authData = useSelector(state => state.auth.authData)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (mode == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const toggleTheme = () => {

    if (mode == 'dark') dispatch(setTheme('light'))
    else dispatch(setTheme('dark'))

  };
  const searchVideo = (e) => {
    navigate(`/search/${e.search}`)
  }


  return (
    <>
      <div className="relative">
        <nav className="fixed w-full bg-white z-10 bg-theme">
          <div className="w-[90%] xl:w-[95%] mx-auto flex justify-between items-center gap-2 sm:gap-10 lg:gap-36 py-6 h-20 bg-theme">
            <Link to="/" className="text-white flex items-center justify-center gap-2 bg-theme lg:gap-4">
              <img className="max-w-8 lg:max-w-11" src={logo} />
              <span className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tighter text-theme  lg:tracking-[-3px]">PlayTube
              </span>
            </Link>
            <div className="flex justify-center items-center">
              <form onSubmit = {handleSubmit(searchVideo)} className="w-[140px] relative xsm:w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] 3xl:w-[700px]">
                <input {...register("search" , { required: true })} className="font-[450] placeholder:text-lg ring-1 ring-black ring-opacity-20 dark:ring-white dark:ring-opacity-30 py-1 sm:py-2 lg:py-2 rounded-3xl w-[100%] px-3 text-sm lg:text-xl bg-theme" type="text" placeholder="Search" />
                <button className="object-contain absolute top-0 rounded-3xl right-0 bg-gray-400 bg-opacity-20 h-full flex justify-center items-center px-4 overflow-hidden dark:ring-gray-100 dark:bg-opacity-10">
                  <svg className="size-4 lg:size-6" viewBox="0 0 24 24" fill="none" stroke={mode == 'dark' ? "white" : 'black'} xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="flex justify-center items-center gap-1 sm:gap-4">
              <button onClick={toggleTheme}>
                <img className="w-8 lg:w-10" src={mode == 'dark' ? light : night} />
              </button>
              {
                isLogged ?
                  (
                    <>
                      <Link 
                        to = {`/c/${authData.username}/video`}
                        className={`rounded-full size-9 flex justify-center ring-1 items-center ring-opacity-20 overflow-hidden ${mode !== 'dark' ? "ring-primary-black" : "ring-white"}`}>
                        <img className="w-full h-full object-fill bg-white" src={authData.avatar} />
                      </Link>
                    </>
                  )
                  :
                  (
                    <Link
                      to="/login"
                      className="py-1 sm:py-2 px-2 lg:px-2 font-semibold ring-1 ring-black ring-opacity-10 rounded-3xl text-nowrap text-theme flex items-center justify-center gap-2 dark:ring-gray-100 dark:ring-opacity-20">
                      <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={mode == 'dark' ? 'white' : 'black'}><path d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106zm-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993zm-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023.144-.32.336-.607.576-.847.24-.24.528-.431.848-.575.32-.144.672-.208 1.024-.208.368 0 .704.064 1.024.208.32.144.608.336.848.575.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848 2.84 2.84 0 0 1-.848.575 2.715 2.715 0 0 1-2.064 0 2.84 2.84 0 0 1-.848-.575 2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406 4.883 4.883 0 0 0-1.088-1.135 5.207 5.207 0 0 0-1.04-.608 2.82 2.82 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.624 3.624 0 0 0 .528-1.934 3.71 3.71 0 0 0-.288-1.47 3.799 3.799 0 0 0-.816-1.199 3.845 3.845 0 0 0-1.2-.8 3.72 3.72 0 0 0-1.472-.287 3.72 3.72 0 0 0-1.472.288 3.631 3.631 0 0 0-1.2.815 3.84 3.84 0 0 0-.8 1.199 3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007.096.336.224.64.4.927.16.288.384.544.624.784.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907z" /></svg>
                      <span className="text-xs sm:text-sm lg:text-md hidden xsm:block">Sign In</span>
                    </Link>
                  )
              }
            </div>
          </div>
        </nav >
      </div >
    </>
  )
}

export default Navbar