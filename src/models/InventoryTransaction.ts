import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  isActive: boolean;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);