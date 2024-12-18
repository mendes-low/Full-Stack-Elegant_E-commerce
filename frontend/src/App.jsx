import { Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CardDetails from './pages/CardDetails/CardDetails';
import User from './pages/User/User';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Home />} />
          <Route path='/card/*' element={<Home />} />
          <Route path='/card/:id' element={<CardDetails />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/user' element={<User />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
