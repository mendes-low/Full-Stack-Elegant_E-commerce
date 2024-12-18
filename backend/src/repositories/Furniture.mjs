import pool from '../db.mjs';

class FurnitureRepository {

    static async getFurnitures() {
        const furnitures = await pool.query('SELECT * FROM furnitures');

        if (!furnitures.rows.length) {
            return null;
        }

        return furnitures.rows;
    }

    static async searchFurnitures(search) {
        const furnitures = await pool.query('SELECT * FROM furnitures WHERE name ILIKE $1 OR category ILIKE $1', [`%${search}%`]);

        if (!furnitures.rows.length) {
            return null;
        }

        return furnitures.rows;
    }

    static async getFilteredFurnitures(category, minPrice, maxPrice, sortOrder) {
        let query = 'SELECT * FROM furnitures WHERE 1=1';
        const params = [];

        if (category && category !== 'All rooms') {
            query += ' AND category = $1';
            params.push(category);
        }

        if (minPrice && minPrice > 0) {
            query += ` AND COALESCE(discount_price, price) >= $${params.length + 1}`;
            params.push(minPrice);
        }

        if (maxPrice && maxPrice > 0) {
            query += ` AND COALESCE(discount_price, price) <= $${params.length + 1}`;
            params.push(maxPrice);
        }

        if (sortOrder === 'price_asc') {
            query += ' ORDER BY COALESCE(discount_price, price) ASC';
        } else if (sortOrder === 'price_desc') {
            query += ' ORDER BY COALESCE(discount_price, price) DESC';
        }

        const furnitures = await pool.query(query, params);

        if (!furnitures.rows.length) {
            return [];
        }

        return furnitures.rows;
    };

    static async getNewFurnitures() {
        const furnitures = await pool.query('SELECT * FROM furnitures WHERE is_new = true');

        if (!furnitures.rows.length) {
            return null;
        }

        return furnitures.rows;
    }

    static async getFurnitureById(id) {
        const furniture = await pool.query('SELECT * FROM furnitures WHERE id = $1', [id]);

        if (!furniture.rows.length) {
            return null;
        }

        return furniture.rows[0];
    }

    static async getFurnitureByCategory(category) {
        const furniture = await pool.query('SELECT * FROM furnitures WHERE category = $1', [category]);

        if (!furniture.rows.length) {
            return null;
        }

        return furniture.rows;
    }

    static async addFurniture(furniture) {
        const { name, price, discount_price, rating, category, details, packaging, images, colors } = furniture;

        const newFurniture = await pool.query('INSERT INTO furnitures (name, price, discount_price, rating, category, details, packaging, images, colors) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, price, discount_price, rating, category, details, packaging, images, colors]
        );

        if (!newFurniture.rows.length) {
            return null;
        }

        return newFurniture.rows[0];
    }

    static async updateFurniture(id, furniture) {
        const { name, price, discount_price, rating, category, details, packaging, images, colors } = furniture;

        const updateFurniture = await pool.query('UPDATE furnitures SET name = $1, price = $2, discount_price = $3, rating = $4, category = $5, details = $6, packaging = $7, images = $8, colors = $9 WHERE id = $10 RETURNING *',
            [name, price, discount_price, rating, category, details, packaging, images, colors, id]
        );

        if (!updateFurniture.rows.length) {
            return null;
        }

        return updateFurniture.rows[0];
    }

    static async deleteFurniture(id) {
        const furniture = await pool.query('DELETE FROM furnitures WHERE id = $1', [id]);

        if (!furniture.rows.length) {
            return null;
        }

        return furniture.rows[0];
    }
}

export default FurnitureRepository;