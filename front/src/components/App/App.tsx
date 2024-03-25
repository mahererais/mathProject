import React from 'react'
import './App.scss'
import '../Menu/Menu'
import Menu from '../Menu/Menu'
import { Route, Routes } from 'react-router-dom'
import Game from '../Game/Game'
import Header from '../Header/Header'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} /> 
        <Route path="/solo/:operator" element={<Game />} /> 
      </Routes>
    </>
  )
}

export default App
