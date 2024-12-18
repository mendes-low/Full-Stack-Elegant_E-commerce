import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';

import './Header.css';

// Icons
import searchIcon from '../../assets/images/header/search.svg';
import userIcon from '../../assets/images/header/user-cicrle.svg';
import cartIcon from '../../assets/images/header/cart.svg';

import CartContext from '../../context/cart/cart';
import UserContext from '../../context/user/user';

const Header = () => {
  const [count, setCount] = useState(0);
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setCount(cart ? cart.length : 0);
  }, [cart]);

  return (
    <div className="header">
      <div className='header-logo'>
        <Link to='/'>
          <h1>3legant<span>.</span></h1>
        </Link>
      </div>
      <div className="header-nav">
        <div>
          <Link className="header-nav-link" to='/'>Home</Link>
        </div>
        <div>
          <Link className="header-nav-link" to='/shop'>Shop</Link>
        </div>
        <div>
          <Link className="header-nav-link" to='/contact-us'>Contack Us</Link>
        </div>
      </div>
      <div className="header-icons">
        <Link to='/shop' className="header-icons-item">
          <img src={searchIcon} alt="seacrh" />
        </Link>
        {user ? <Link to='/user' className="header-icons-item">
          <img src={userIcon} alt="user-cicrle" />
        </Link>
          : (
            <Link to='/login' className="header-icons-item">
              <p>Login</p>
            </Link>
          )}
        <Link to={user ? '/cart' : '/login'} className=" header-icons-cart">
          <Badge badgeContent={count} sx={{
            '& .MuiBadge-badge': {
              backgroundColor: 'black',
              color: 'white',
            }
          }}>
            <img src={cartIcon} alt="cart" />
          </Badge>
        </Link>
      </div>
    </div>
  )
}

export default Header;