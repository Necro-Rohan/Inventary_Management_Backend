import type { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id as string);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const adjustStock = async (req: Request, res: Response) => {
  try {
    const { quantity, type, reason } = req.body;

    if (!quantity || !type) {
      res.status(400).json({ success: false, error: 'Please provide quantity and type' });
      return;
    }

    const updatedProduct = await productService.adjustStock(req.params.id as string, quantity, type, reason);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};