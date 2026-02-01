import { CategoryModel } from '../models/Category.model.js';

export class CategoryService {

  async createCategory(data: any) {
    return await CategoryModel.create(data);
  }

  async getAllCategories() {
    // Just find active categories
    return await CategoryModel.find({ isActive: true });
  }
}