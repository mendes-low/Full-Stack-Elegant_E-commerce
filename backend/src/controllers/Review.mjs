import ReviewRepository from "../repositories/Review.mjs";
import FurnitureRepository from "../repositories/Furniture.mjs";

class ReviewController {
    async getReviews(req, res) {
        const furniture = await FurnitureRepository.getFurnitureById(req.params.id);
        const reviews = await ReviewRepository.getReviews(furniture);
        res.status(200).send(reviews);
    };

    async addReview(req, res) {
        const { furnitureId, comment, rating } = req.body;
        if (req.user) {
            const furniture = await FurnitureRepository.getFurnitureById(furnitureId);

            const review = await ReviewRepository.addReview({ user: req.user, furniture, comment, rating });
            res.status(201).send(review);
        }
    };

    async deleteReview(req, res) {
        const review = await ReviewRepository.deleteReview(req.user, req.params.id);
        res.status(200).send(review);
    };
};

export default ReviewController;