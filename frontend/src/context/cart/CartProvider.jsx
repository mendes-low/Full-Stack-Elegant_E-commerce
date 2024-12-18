import { useState, useEffect } from "react";

import cartService from '../../services/cart.service';

import CartContext from './cart';

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        updateCart();
    }, []);

    function updateCart() {
        cartService
            .getCart()
            .then(res => {
                setCart(res.data)
            })
            .catch(err => console.log(err));
    }

    function getFurnitureById(id) {
        if (cart.length === 0) return null
        return cart.find(item => item.id === id);
    }

    function inCart(item) {
        if (cart.length === 0) return false
        return cart.some(cartItem => cartItem.id === item.id);
    }

    async function changeQuantity(item, action) {
        try {
            const newQuantity = action === 'inc' ? item.quantity + 1 : item.quantity - 1;
            await cartService.updateCart(item.id, newQuantity);
            updateCart();
        } catch (err) {
            console.log('Error updating cart:', err);
        }
    }

    function addToCart(item) {
        cartService
            .addToCart(item.id)
            .then(() => updateCart())
            .catch(err => console.log(err));
    }

    function deleteFromCart(item) {
        cartService
            .deleteFromCart(item.id)
            .then(() => updateCart())
            .catch(err => console.log(err));
    }

    // function clearCart() {
    //     cartService
    //         .clearCart()
    //         .then(() => updateCart())
    //         .catch(err => console.log(err));
    // }

    return (
        <CartContext.Provider value={{ cart, getFurnitureById, inCart, changeQuantity, addToCart, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;