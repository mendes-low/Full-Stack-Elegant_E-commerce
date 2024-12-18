import pool from "../db.mjs";

class WishlistRepository {
    static async getWishlist(user) {
        const { rows } = await pool.query(`SELECT 
        furnitures.name, furnitures.price, furnitures.discount_price, furnitures.images, furnitures.colors 
        FROM cart INNER JOIN furnitures ON cart.furniture_id = furnitures.id 
        INNER JOIN users ON users.id = cart.user_id WHERE user_id = $1`, [user.id]);

        if (!rows.length) {
            return null;
        }

        return rows;
    };

    static async addWishlist(user, furniture) {
        const { rows } = await pool.query(`INSERT INTO wishlist (user_id, furniture_id) VALUES ($1, $2) RETURNING *`, [user.id, furniture.id]);

        if (!rows.length) {
            return null;
        }

        return rows[0];
    };

    static async deleteWishlist(user, furniture) {
        const { rows } = await pool.query(`DELETE FROM wishlist WHERE user_id = $1 AND furniture_id = $2 RETURNING *`, [user.id, furniture.id]);

        if (!rows.length) {
            return null;
        }

        return rows[0];
    };
}

export default WishlistRepository;
