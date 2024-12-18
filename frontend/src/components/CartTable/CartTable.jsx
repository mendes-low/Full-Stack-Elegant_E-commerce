import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid #6C7275',
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'transparent',
        color: '#121212',
        fontFamily: '"Inter", sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '26px'
    },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: '1px solid #E8ECEF',
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    border: 'none',
}));

import './CartTable.css';

import plus from '../../assets/images/card/card-plus.svg';
import minus from '../../assets/images/card/card-minus.svg';
import remove from '../../assets/images/cart/cart-remove.svg';

import CartContext from '../../context/cart/cart';

function CartTable() {
    const { cart, changeQuantity, deleteFromCart } = useContext(CartContext);

    const cutText = (text) => text.length > 17 ? `${text.slice(0, 20)}...` : text;

    return (
        <TableContainer component={CustomPaper} sx={{ width: '650px' }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className='cart-table-head-cell'>Product</StyledTableCell>
                        <StyledTableCell className='cart-table-head-cell' align="right">Quantity</StyledTableCell>
                        <StyledTableCell className='cart-table-head-cell' align="right">Price</StyledTableCell>
                        <StyledTableCell className='cart-table-head-cell' align="right">SubTotal</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.length > 0 ? cart.map((furniture) => (
                        <StyledTableRow key={furniture.name}>
                            <StyledTableCell component="th" scope="row">
                                <div className='cart-product'>
                                    <div className='cart-product-img'>
                                        <img src={`images${furniture.images[0]}`} alt="" />
                                    </div>
                                    <div className='cart-product-details'>
                                        <h3>{cutText(furniture.name)}</h3>
                                        {/* <h2>Color: Black</h2> */}
                                        <button onClick={() => deleteFromCart(furniture)}>
                                            <img src={remove} alt="remove" />
                                            <p>Remove</p>
                                        </button>
                                    </div>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div className='cart-product-quantity'>
                                    <button onClick={() => changeQuantity(furniture, 'dec')} disabled={furniture.quantity === 1}>
                                        <img src={minus} alt="minus" />
                                    </button>
                                    <p>{furniture.quantity}</p>
                                    <button onClick={() => changeQuantity(furniture, 'inc')} disabled={furniture.quantity === 99}>
                                        <img src={plus} alt="plus" />
                                    </button>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">{furniture.coalesce}</StyledTableCell>
                            <StyledTableCell align="right">{furniture.total_price}</StyledTableCell>
                        </StyledTableRow>
                    ))
                        : <p className='cart-empty'>Cart is empty</p>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CartTable;