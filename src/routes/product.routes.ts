import { Router } from 'express';
import { createProduct, getProducts, getProductById, adjustStock } from '../controllers/Product.controller.js';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id/stock', adjustStock);

export default router;