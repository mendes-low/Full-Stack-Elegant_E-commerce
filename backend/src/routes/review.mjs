import { Router } from "express";
import ReviewController from "../controllers/Review.mjs";

const router = new Router();
const controller = new ReviewController();

// GET
router.get("/reviews/:id", controller.getReviews);

// POST
router.post("/reviews", controller.addReview);

// DELETE
router.delete("/reviews/:id", controller.deleteReview);

export default router;

