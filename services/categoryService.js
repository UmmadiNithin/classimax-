const CategorySchema = require('../modals/categoryModel');

const createCategoryService = async (category_name, userId) => {
    const existingCategory = await CategorySchema.findOne({ category_name: category_name.trim() });
   
    if (existingCategory) {
        throw { message: 'Category name already exists', responseCode: 409 };
    }

    const category = new CategorySchema({
        category_name,
        created_by: userId,
        updated_by: userId,
    });
   

    return await category.save();
};

const fetchAllCategoriesService = async () => {
    return await CategorySchema.find();
};

const removeCategoryService = async (categoryId, userId) => {
    const category = await CategorySchema.findById(categoryId);
    if (!category) {
        throw { message: 'Category not found', responseCode: 404 };
    }
    if (category.created_by.toString() !== userId.toString()) {
        throw { message: 'Unauthorized to delete this category', responseCode: 403 };
    }

    await CategorySchema.findByIdAndDelete(categoryId);
};

const fetchSingleCategoryService = async (categoryId, userId) => {
    const category = await CategorySchema.findById(categoryId);
    if (!category) {
        throw { message: 'Category not found', responseCode: 404 };
    }
    if (category.created_by.toString() !== userId.toString()) {
        throw { message: 'Unauthorized to view this category', responseCode: 403 };
    }

    return category;
};

const modifyCategoryService = async (categoryId, category_name, userId) => {
    const category = await CategorySchema.findById(categoryId);
    if (!category) {
        throw { message: 'Category not found', responseCode: 404 };
    }

    const existingCategory = await CategorySchema.findOne({ category_name: category_name.trim() });
    if (existingCategory && existingCategory._id.toString() !== categoryId.toString()) {
        throw { message: 'Category name already exists', responseCode: 409 };
    }

    category.category_name = category_name.trim();
    category.updated_by = userId;
    category.updated_at = Date.now();

    return await category.save();
};

module.exports = {
    createCategoryService,
    fetchAllCategoriesService,
    removeCategoryService,
    fetchSingleCategoryService,
    modifyCategoryService
};
