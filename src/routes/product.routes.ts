import { Router } from 'express';
import { createProduct, getProducts, getProductById, adjustStock } from '../controllers/product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id/stock', adjustStock);

export default router;