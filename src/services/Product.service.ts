import { ProductModel } from "../models/Product.model";
import { TransactionModel } from "../models/InventoryTransaction.model";


export class ProductService {

  async createProduct(data: any) {
    const product = await ProductModel.create(data);
    return product;
  }

  async getAllProducts() {
    return await ProductModel.find()
      .populate('category')
      .populate('supplier');
  }

  async getProductById(id: string) {
    return await ProductModel.findById(id)
      .populate('category')
      .populate('supplier');
  }

  async adjustStock(productId: string, quantity: number, type: string, reason?: string) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (type === 'INBOUND') {
      product.stockLevel += quantity;
    } else if (type === 'OUTBOUND') {
      if (product.stockLevel < quantity) {
        throw new Error('Not enough stock to sell!');
      }
      product.stockLevel -= quantity;
    } else if (type === 'ADJUSTMENT') {
      product.stockLevel += quantity;
    }

    if (product.stockLevel === 0) {
      product.status = 'OUT_OF_STOCK';
    } else if (product.stockLevel < product.minStockLevel) {
      product.status = 'LOW_STOCK';
    } else {
      product.status = 'IN_STOCK';
    }

    await product.save();

    await TransactionModel.create({
      product: product._id,
      type,
      quantity,
      reason
    });

    return product;
  }
}