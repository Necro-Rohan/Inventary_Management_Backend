import type { Request, Response } from 'express';
import { SupplierService } from '../services/Supplier.service.js';

const supplierService = new SupplierService();

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json({ success: true, data: supplier });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    return res.status(200).json({ success: true, data: suppliers });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};