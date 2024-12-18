import ProductRepository from '../repositories/Product.mjs';

export function validateId(req, res, next) {
    const id = req.params.id;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).send('ID must be a number');
    }
    next();
}

export async function resolveProductById(req, res, next) {
    const id = req.params.id;
    const product = await ProductRepository.getProductById(id);
    if (!product) {
        return res.status(400).send('Product not found');
    }
    req.product = product;
    next();
}

