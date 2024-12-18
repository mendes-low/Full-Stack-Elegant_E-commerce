import API from '../api/axios.config';

class WishlistService {
    async getWishlist() {
        return API.get(`/wishlist`);
    };

    async addWishlist() {
        return API.post(`/wishlist`);
    };

    async deleteWishlist(id) {
        return API.delete(`/wishlist/${id}`);
    };
};

export default new WishlistService();
