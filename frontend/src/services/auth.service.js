import API from '../api/axios.config';

class AuthService {
    async status() {
        return API.get('/status');
    }

    async register(credentials) {
        return API.post('/register', credentials);
    }

    async login(credentials) {
        return API.post('/login', credentials);
    }

    async logout() {
        return API.post('/logout');
    }
}

export default new AuthService();