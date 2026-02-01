import { SupplierModel } from '../models/Supplier.model.js';

export class SupplierService {

  async createSupplier(data: any) {
    return await SupplierModel.create(data);
  }

  async getAllSuppliers() {
    return await SupplierModel.find();
  }
}