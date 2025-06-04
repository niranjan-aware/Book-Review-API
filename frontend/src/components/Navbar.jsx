import React from 'react'

export default function Navbar() {
  return (
    <nav className="main-container flex flex-row items-center space-x-10 border-b-[1px] border-slate-500 shadow-3xl shadow-white h-[64px]  px-16">
      <div className="title">
        <h1 className="text-white text-3xl font-bold">Niranjan Aware</h1>
      </div>
      <div className="portfolio-link text-white text-xl">
        <a href="https://niranjan-s-studio.netlify.app/" target='_blank' className="">Portfolio: <span className='text-sky-500'>Niranjan's Studio</span></a>
      </div>
      <div className="description">
        <h3 className='text-slate-300 text-base font-medium'>Billeasy Assignment: Backend dev</h3>
      </div>
    </nav>
  )
}
