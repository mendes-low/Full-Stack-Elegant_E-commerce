import WishlistRepository from "../repositories/Wishlist.mjs";
import FurnitureRepository from "../repositories/Furniture.mjs";

class WishlistController {
    async getWishlist(req, res) {
        if (!req.user) { return res.sendStatus(401); }
        const wishlist = await WishlistRepository.getWishlist(req.user);
        res.status(200).send(wishlist);
    }

    async addWishlist(req, res) {
        const { id } = req.params;
        if (!req.user) { return res.sendStatus(401); }
        const furniture = await FurnitureRepository.getFurnitureById(id);
        const wishlist = await WishlistRepository.addWishlist(req.user, furniture);
        res.status(201).send(wishlist);
    }

    async deleteWishlist(req, res) {
        const { id } = req.params;
        if (!req.user) { return res.sendStatus(401); }
        const furniture = await FurnitureRepository.getFurnitureById(id);
        const wishlist = await WishlistRepository.deleteWishlist(req.user, furniture);
        res.status(200).send(wishlist);
    }
}

export default WishlistController;