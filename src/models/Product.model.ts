import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  sku: string;           // Stock Keeping Unit
  description?: string;
  price: number;
  stockLevel: number;    // Current quantity
  minStockLevel: number; // Alert threshold
  category: mongoose.Types.ObjectId; // Reference to Category
  supplier: mongoose.Types.ObjectId; // Reference to Supplier
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  stockLevel: { type: Number, required: true, default: 0 },
  minStockLevel: { type: Number, default: 5 }, // Alert if stock < 5
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  status: {
    type: String,
    enum: ['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'],
    default: 'IN_STOCK'
  }
}, { timestamps: true });

// Index for fast searching
ProductSchema.index({ name: 'text', sku: 'text' });

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);