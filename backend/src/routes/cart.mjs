import { Router } from "express";

import CartController from "../controllers/Cart.mjs";

const router = new Router();
const controller = new CartController();

// GET
router.get('/cart', controller.getCart);

// POST
router.post('/cart/:id', controller.addToCart);

// PUT
router.put('/cart/:id', controller.updateCart);

// DELETE
router.delete('/cart/:id', controller.deleteFromCart);
router.delete('/cart', controller.clearCart);

export default router;