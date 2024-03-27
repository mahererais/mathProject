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
        {/* // = la route a ete ajouté temporairement, parce qu'en production sur le serveur */ }
        {/* // = "mahererais-server.eddi.cloud", j'ai cree un alias dans .conf d'apache2 */ }
        {/* // = pour ce connecter au site (=> http://mahererais-server.eddi.cloud/math) */ }
        {/* // = et cela creer un probleme de route  */ }
        <Route path="/math" element={<Menu />} /> 
      </Routes>
    </>
  )
}

export default App
