import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
export default function App() {
  return (
    <div className="main-container">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}
