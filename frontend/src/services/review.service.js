import API from '../api/axios.config';

class ReviewService {
    async getReviews(furniture) {
        return API.get(`/reviews/${furniture.id}`);
    }

    async addReview(review) {
        return API.post(`/reviews`, review);
    }

    async deleteReview(review) {
        return API.delete(`/reviews/${review.id}`);
    }
}

export default new ReviewService();