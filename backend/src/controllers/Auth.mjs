import { validationResult } from 'express-validator';

import UserRepository from "../repositories/User.mjs";

class AuthController {
    async status(req, res) {
        if (!req.user) return res.sendStatus(401);
        const user = req.user
        res.status(200).send({ id: user.id, email: user.email, fullname: user.fullname });
    }

    async register(req, res) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const user = req.body;
        const newUser = await UserRepository.addUser(user);
        req.login(newUser, (err) => {
            if (err) { return res.sendStatus(400); }
            return res.sendStatus(201);
        });
    }

    async login(req, res) {
        res.sendStatus(200);
    };

    async logout(req, res) {
        if (!req.user) return res.sendStatus(401);
        req.logout((err) => {
            if (err) return res.sendStatus(400);
            res.sendStatus(200);
        });
    }
}

export default AuthController;