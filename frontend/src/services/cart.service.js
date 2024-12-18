import API from '../api/axios.config';

class CartService {
    async getCart() {
        return API.get('/cart');
    }

    async addToCart(id) {
        return API.post(`/cart/${id}`);
    }

    async updateCart(id, quantity) {
        return API.put(`/cart/${id}`, { quantity });
    }

    async deleteFromCart(id) {
        return API.delete(`/cart/${id}`);
    }

    async clearCart() {
        return API.delete('/cart');
    }
};

export default new CartService();