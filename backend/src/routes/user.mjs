import { Router } from "express";
import UserController from "../controllers/User.mjs";

const router = new Router();
const controller = new UserController();

// GET
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.get("/users/:email", controller.getUserByEmail);

// POST
router.post("/users", controller.addUser);

// PUT
router.put("/users/:id", controller.updateUserField);

// DELETE
router.delete("/users/:id", controller.deleteUser);

export default router;