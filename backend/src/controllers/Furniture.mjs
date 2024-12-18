import FurnitureRepository from "../repositories/Furniture.mjs";

class FurnitureController {

    async getFurnitures(req, res) {
        let furnitures;

        const category = req.query.category || 'All rooms';
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 0;
        const sortOrder = req.query.sortOrder || '';
        const search = req.query.search || '';

        if (search) {
            furnitures = await FurnitureRepository.searchFurnitures(search);
        } else {
            furnitures = await FurnitureRepository.getFilteredFurnitures(category, minPrice, maxPrice, sortOrder);
        }
        res.status(200).send(furnitures);
    }

    async getNewFurnitures(req, res) {
        const furnitures = await FurnitureRepository.getNewFurnitures();
        res.status(200).send(furnitures);
    }

    async getFurnitureById(req, res) {
        const furniture = await FurnitureRepository.getFurnitureById(req.params.id);
        res.status(200).send(furniture);
    }

    async getFurnitureByCategory(req, res) {
        const furniture = await FurnitureRepository.getFurnitureByCategory(req.params.category);
        res.status(200).send(furniture);
    }

    async addFurniture(req, res) {
        const furniture = await FurnitureRepository.addFurniture(req.body);
        res.status(201).send(furniture);
    }

    async updateFurniture(req, res) {
        const furniture = await FurnitureRepository.updateFurniture(req.params.id, req.body);
        res.status(200).send(furniture);
    }

    async deleteFurniture(req, res) {
        const furniture = await FurnitureRepository.deleteFurniture(req.params.id);
        res.status(200).send(furniture);
    }
}

export default FurnitureController;