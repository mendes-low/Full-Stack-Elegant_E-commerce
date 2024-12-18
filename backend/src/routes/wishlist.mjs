import { Router } from "express";
import WishlistController from "../controllers/Wishlist.mjs";

const router = new Router();
const controller = new WishlistController();

// GET
router.get("/wishlist", controller.getWishlist);

// POST
router.post("/wishlist/:id", controller.addWishlist);

// DELETE
router.delete("/wishlist/:id", controller.deleteWishlist);

export default router;