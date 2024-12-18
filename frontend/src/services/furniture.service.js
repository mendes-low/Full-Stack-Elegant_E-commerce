import API from '../api/axios.config';

class FurnitureService {
    async getFurnitures() {
        return API.get('/furnitures');
    }

    async getFilteredFurnitures(category = 'All rooms', minPrice = 0, maxPrice = 0, sortOrder = '', search = '') {
        return API.get('/furnitures', {
            params: { category, minPrice, maxPrice, sortOrder, search },
        });
    }


    async getNewFurnitures() {
        return API.get('/furnitures/new');
    }

    async getFurnitureById(id) {
        return API.get(`/furnitures/${id}`);
    }

    async getFurnitureByCategory(category) {
        return API.get(`/furnitures?category=${category}`);
    }

    async addFurniture(furniture) {
        return API.post('/furnitures', furniture);
    }

    async deleteFurniture(id) {
        return API.delete(`/furnitures/${id}`);
    }

    async updateFurniture(id, furniture) {
        return API.put(`/furnitures/${id}`, furniture);
    }
}

export default new FurnitureService();