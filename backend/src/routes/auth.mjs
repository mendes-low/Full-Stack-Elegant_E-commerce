import { Router } from "express";
import passport from "passport";
import { body } from "express-validator";

import AuthController from "../controllers/Auth.mjs";

const router = new Router();
const controller = new AuthController();

// GET
router.get('/status', controller.status);

// POST
router.post('/login', passport.authenticate('local'), controller.login);
router.post('/register',
    body('email').isEmail().withMessage('Email should be valid'),
    body('password').isLength({ min: 8 }).withMessage('Password should be 8 least of chapter'),
    controller.register);
router.post('/logout', controller.logout);

export default router;
