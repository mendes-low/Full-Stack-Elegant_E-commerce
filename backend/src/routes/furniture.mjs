import { Router } from "express";
import FurnitureController from "../controllers/Furniture.mjs";

const router = new Router();
const controller = new FurnitureController();

// GET
router.get("/furnitures", controller.getFurnitures);
router.get("/furnitures/new", controller.getNewFurnitures);
router.get("/furnitures/:id", controller.getFurnitureById);
router.get("/furnitures/category/:category", controller.getFurnitureByCategory);

// POST
router.post("/furnitures", controller.addFurniture);

// PUT
router.put("/furnitures/:id", controller.updateFurniture);

// DELETE
router.delete("/furnitures/:id", controller.deleteFurniture);

export default router;
