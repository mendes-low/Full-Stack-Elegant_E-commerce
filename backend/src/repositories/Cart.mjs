import pool from '../db.mjs';

class CartRepository {
    static async getCart(user) {
        const cart = await pool.query(`
        SELECT 
        furnitures.id, furnitures.name, COALESCE(furnitures.discount_price, furnitures.price), furnitures.discount_price, furnitures.images, quantity, 
        COALESCE(furnitures.discount_price, furnitures.price) * quantity AS total_price FROM cart 
        INNER JOIN furnitures ON cart.furniture_id = furnitures.id 
        INNER JOIN users ON users.id = cart.user_id 
        WHERE user_id = $1`, [user.id]);

        if (!cart.rows.length) {
            return null;
        }

        return cart.rows;
    }

    static async addToCart(user, furniture, quantity = 1) {
        const cart = await pool.query(`INSERT INTO cart (user_id, furniture_id, quantity) VALUES ($1, $2, $3) RETURNING *`, [user.id, furniture.id, quantity]);

        if (!cart.rows.length) {
            return null;
        }

        return cart.rows[0];
    }

    static async updateCart(user, furniture, quantity) {
        const cart = await pool.query(`UPDATE cart SET quantity = $1 WHERE user_id = $2 AND furniture_id = $3 RETURNING *`, [quantity, user.id, furniture.id]);

        if (!cart.rows.length) {
            return null;
        }

        return cart.rows[0];
    }

    static async deleteFromCart(user, furniture) {
        const cart = await pool.query(`DELETE FROM cart WHERE user_id = $1 AND furniture_id = $2 RETURNING *`, [user.id, furniture.id]);

        if (!cart.rows.length) {
            return null;
        }

        return cart.rows[0];
    }

    static async clearCart(userId) {
        const cart = await pool.query(`DELETE FROM cart WHERE user_id = $1 RETURNING *`, [userId]);

        if (!cart.rows.length) {
            return null;
        }

        return cart.rows;
    }

};

export default CartRepository;