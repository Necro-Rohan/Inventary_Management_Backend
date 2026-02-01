import { SupplierModel } from '../models/Supplier.model';

export class SupplierService {

  async createSupplier(data: any) {
    return await SupplierModel.create(data);
  }

  async getAllSuppliers() {
    return await SupplierModel.find();
  }
}