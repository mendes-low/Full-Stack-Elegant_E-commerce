import pool from '../db.mjs';
import { hashPassword } from '../helpers/hash.mjs';

class UserRepository {
    static async getUsers() {
        const users = await pool.query('SELECT * FROM users');

        if (!users.rows.length) {
            return null;
        }

        return users.rows;
    }

    static async getUserById(id) {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (!user.rows.length) {
            return null;
        }

        return user.rows[0];
    }

    static async getUserByUsername(username) {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (!user.rows.length) {
            return null;
        }

        return user.rows[0];
    }

    static async addUser(user) {
        const { username, email, password, fullname } = user;

        const hashedPassword = await hashPassword(password);

        const newUser = await pool.query('INSERT INTO users (username, email, password, fullname) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, fullname]
        );

        if (!newUser.rows.length) {
            return null;
        }

        return newUser.rows[0];
    }

    static async deleteUser(id) {
        const user = await pool.query('DELETE FROM users WHERE id = $1', [id]);

        if (!user.rows.length) {
            return null;
        }

        return user.rows[0];
    }

}

export default UserRepository;