import API from '../api/axios.config';

class UserService {

    async getUsers() {
        return API.get('/users');
    }

    async getUserById(id) {
        return API.get(`/users/${id}`);
    }

    async getUserByEmail(email) {
        return API.get(`/users/${email}`);
    }

    async addUser(credentials) {
        return API.post('/users', credentials);
    }

    async updateUserField(id, credentials) {
        return API.put(`/users/${id}`, credentials);
    }

    async deleteUser(id) {
        return API.delete(`/users/${id}`);
    }
}

export default new UserService();