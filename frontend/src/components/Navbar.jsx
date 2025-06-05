import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function Navbar() {
  const {logout, authUser} = useAuthStore();
  const handleLogout = () =>{
      logout();
  }

  return (
    <nav className="main-container flex flex-row items-center justify-between space-x-10 bg-slate-400 h-[64px]  px-16">
      <div className="title">
        <h1 className="text-white text-3xl font-bold">Niranjan Aware</h1>
      </div>
      <div className="portfolio-link text-white text-xl">
        <a href="https://niranjan-s-studio.netlify.app/" target='_blank' className="">Portfolio: <span className=' text-blue-800 underline underline-offset-4'>Niranjan's Studio</span></a>
      </div>
      <div className="description">
        <h3 className='text-slate-100 text-base font-medium'>Billeasy Assignment: Backend dev</h3>
      </div>
      {authUser && <div className="logout">
        <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >Logout</button>
      </div>}
    </nav>
  )
}
