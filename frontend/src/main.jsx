import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

import UserProvider from '../src/context/user/UserProvider.jsx';
import WishlistProvider from './context/wishlist/WishlistProvider.jsx';
import CartProvider from './context/cart/CartProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
