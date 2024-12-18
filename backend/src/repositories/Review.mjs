import pool from '../db.mjs';

class ReviewRepository {
    static async getReviews(furniture) {
        const reviews = await pool.query(`
            SELECT comment, rating, users.fullname
            FROM reviews
            INNER JOIN users ON reviews.user_id = users.id
            WHERE furniture_id = $1
            `, [furniture.id]);

        if (!reviews.rows.length) {
            return null;
        }

        return reviews.rows;
    }

    static async addReview(review) {
        const { user, furniture, comment, rating } = review
        const reviews = await pool.query(`INSERT INTO reviews (user_id, furniture_id, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *`, [user.id, furniture.id, comment, rating]);

        if (!reviews.rows.length) {
            return null;
        }

        return reviews.rows[0];
    }

    static async deleteReview(user, furniture) {
        const review = await pool.query(`DELETE FROM reviews WHERE user_id = $1 AND furniture_id = $2 RETURNING *`, [user.id, furniture.id]);

        if (!review.rows.length) {
            return null;
        }
        return review.rows[0];
    }
};

export default ReviewRepository;