import CartRepository from "../repositories/Cart.mjs";
import FurnitureRepository from "../repositories/Furniture.mjs";

class CartController {
    async getCart(req, res) {
        if (req.user) {
            const cart = await CartRepository.getCart(req.user);
            return res.status(200).send(cart);
        }
        const cart = req.session.cart || [];
        res.status(200).send(cart);
    }

    async addToCart(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        const furniture = await FurnitureRepository.getFurnitureById(id);
        if (req.user) {
            await CartRepository.addToCart(req.user, furniture, quantity);
            const cart = await CartRepository.getCart(req.user);
            return res.send(cart);
        }
        const cart = req.session.cart || [];
        furniture.quantity = quantity;
        cart.push(furniture);
        req.session.cart = cart;
        res.status(201).send(cart);
    }

    async updateCart(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        const furniture = await FurnitureRepository.getFurnitureById(id);
        if (req.user) {
            await CartRepository.updateCart(req.user, furniture, quantity);
            const cart = await CartRepository.getCart(req.user);
            return res.send(cart);
        }
        let cart = req.session.cart || [];
        cart = cart.map(item => {
            if (item.id === id) {
                item.quantity = quantity;
            }
            return item;
        })
        req.session.cart = cart;
        res.send(cart);
    }

    async deleteFromCart(req, res) {
        const { id } = req.params;
        const furniture = await FurnitureRepository.getFurnitureById(id);
        if (req.user) {
            await CartRepository.deleteFromCart(req.user, furniture);
            const cart = await CartRepository.getCart(req.user);
            return res.send(cart);
        }
        let cart = req.session.cart || [];
        cart = cart.filter(item => item.id !== id);
        req.session.cart = cart;
        res.status(200).send(cart);
    }

    async clearCart(req, res) {
        if (req.user) {
            await CartRepository.clearCart(req.user);
            const cart = await CartRepository.getCart(req.user);
            return res.send(cart);
        }
        req.session.cart = [];
        res.status(200).send(req.session.cart);
    }
}

export default CartController;