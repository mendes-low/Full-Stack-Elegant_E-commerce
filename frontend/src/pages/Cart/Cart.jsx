import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Radio from '@mui/material/Radio';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import './Cart.css';

import cartArrow from '../../assets/images/cart/cart-success.svg';

import CartTable from '../../components/CartTable/CartTable';

import CartContext from '../../context/cart/cart';

const Cart = () => {
  const [value, setValue] = useState('1');
  const [radioValue, setRadioValue] = useState('express');
  const { cart, changeQuantity, deleteFromCart } = useContext(CartContext);

  function formatPrice(price) {
    let priceStr = String(price);
    if (priceStr.length <= 3) return priceStr;
    return formatPrice(priceStr.slice(0, -3)) + ',' + priceStr.slice(-3);
  }

  function calculateDiscount(price) {
    const discount = 0.20;
    const discountedPrice = price * (1 - discount);
    return parseInt(discountedPrice);
  }

  const subTotal = cart && cart.reduce((acc, curr) => acc + curr.total_price, 0);
  const total = (radioValue === 'express') ? (subTotal + 15) : calculateDiscount(subTotal);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <Box>
        <TabContext value={value}>
          <TabList TabIndicatorProps={{ style: { backgroundColor: '#141718', }, }}
            sx={{
              '& .MuiTab-root': {
                marginRight: '40px',
                textTransform: 'none',
              },
            }}
          >
            <Tab
              label={
                <Box className={value === '1' ? "cart-panel-label" : value > '1' ? "cart-panel-label cart-panel-label-active" : "cart-panel-label"}>
                  <div>
                    {value > '1'
                      ? <img src={cartArrow} alt="arrow-success" />
                      : <p>1</p>
                    }
                  </div>
                  <span>Shopping cart</span>
                </Box>
              }
              value={'1'}
              disabled={value !== '1'}
            />
            <Tab
              label={
                <Box className={value < '2' ? "cart-panel-label cart-panel-label-disabled" : value > '2' ? "cart-panel-label cart-panel-label-active" : "cart-panel-label"}>
                  <div>
                    {value > '2'
                      ? <img src={cartArrow} alt="arrow-success" />
                      : <p>2</p>
                    }
                  </div>
                  <span>Checkout details</span>
                </Box>
              }
              value={'2'}
              disabled={value !== '2'}
            />
            <Tab
              label={
                <Box className={value < '3' ? "cart-panel-label cart-panel-label-disabled" : value > '3' ? "cart-panel-label cart-panel-label-active" : "cart-panel-label"}>
                  <div>
                    <p>3</p>
                  </div>
                  <span>Order complete</span>
                </Box>
              }
              value={'3'}
              disabled={value !== '3'}
            />
          </TabList>
          <TabPanel value={'1'} className="cart-panel-container">
            <div className="cart-panel-items">
              <div className='cart-items'>
                <CartTable />
              </div>
              <div className="cart-panel">
                <p className='cart-summary'>Cart summary</p>
                <RadioGroup
                  className='cart-radio-group'
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                >
                  <FormControlLabel
                    className='cart-radio'
                    value="express"
                    style={{ margin: '0px', border: radioValue === 'express' ? ' 1px solid #141718' : '1px solid #6C7275' }}
                    control={<Radio sx={{ color: '#6C7275', '&.Mui-checked': { color: 'black' } }} />}
                    label={
                      <div className={radioValue === 'express' ? 'cart-radio-label-active' : 'cart-radio-label'}>
                        <span>Express shipping</span><span>+$15</span>
                      </div>
                    }
                  />
                  <FormControlLabel
                    className='cart-radio'
                    value="pickup"
                    style={{ margin: '0px 0px 16px 0px', border: radioValue === 'pickup' ? ' 1px solid #141718' : '1px solid #6C7275' }}
                    control={<Radio sx={{ color: '#6C7275', '&.Mui-checked': { color: 'black' } }} />}
                    label={
                      <div className={radioValue === 'pickup' ? 'cart-radio-label-active' : 'cart-radio-label'}>
                        <span>Pick Up</span><span>-%20</span>
                      </div>}
                  />
                </RadioGroup>
                <div className='cart-panel-prices'>
                  <div className='cart-panel-subtotal'>
                    <p>Subtotal</p>
                    <p>${cart ? formatPrice(subTotal) : 0}</p>
                  </div>
                  <div className='cart-panel-total'>
                    <p>Total</p>
                    <p>${cart ? formatPrice(total) : 0}</p>
                  </div>
                </div>
                <button className='cart-btn' onClick={() => setValue('2')}>
                  <p>Checkout</p>
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={'2'}>
            <button className='cart-btn' onClick={() => setValue('1')}>
              <p>Back</p>
            </button>
          </TabPanel>
          <TabPanel value={'3'} >

          </TabPanel>
        </TabContext>
      </Box>
    </div >
  )
}

export default Cart;