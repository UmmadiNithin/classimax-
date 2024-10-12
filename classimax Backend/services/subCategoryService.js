const SubCategorySchema = require('../modals/subCategoryModel');
const CategorySchema = require('../modals/categoryModel');



const createSubCategoryService = async (subcat_name, categoryId, userId) => {
    const existingSubCategory = await SubCategorySchema.findOne({ subcat_name: subcat_name.trim() });
    if (existingSubCategory) {
        throw { message: 'SubCategory name already exists', responseCode: 409 };
    }

    const existingCategory = await CategorySchema.findById(categoryId);
    if (!existingCategory) {
        throw { message: 'Invalid categoryId', responseCode: 400 };
    }

    const subcategory = new SubCategorySchema({
        subcat_name,
        categoryId,
        created_by: userId,
        updated_by: userId
    });

    return await subcategory.save();
};

const fetchAllSubCategoriesService = async () => {
    return await SubCategorySchema.find();
};

const removeSubCategoryService = async (SubcategoryId, userId) => {
    const Subcategory = await SubCategorySchema.findById(SubcategoryId);
    if (!Subcategory) {
        throw { message: 'SubCategory not found', responseCode: 404 };
    }
    if (Subcategory.created_by.toString() !== userId.toString()) {
        throw { message: 'Unauthorized to delete this category', responseCode: 403 };
    }

    await SubCategorySchema.findByIdAndDelete(SubcategoryId);
};

const fetchSingleSubCategoryService = async (SubcategoryId, userId) => {
    const Subcategory = await SubCategorySchema.findById(SubcategoryId);
    if (!Subcategory) {
        throw { message: 'SubCategory not found', responseCode: 404 };
    }
    if (Subcategory.created_by.toString() !== userId.toString()) {
        throw { message: 'Unauthorized to view this category', responseCode: 403 };
    }

    return Subcategory;
};

const modifySubCategoryService = async (SubcategoryId, subcat_name, userId) => {
    const Subcategory = await SubCategorySchema.findById(SubcategoryId);
    if (!Subcategory) {
        throw { message: 'SubCategory not found', responseCode: 404 };
    }

    const existingSubCategory = await SubCategorySchema.findOne({ subcat_name: subcat_name.trim() });
    if (existingSubCategory && existingSubCategory._id.toString() !== SubcategoryId.toString()) {
        throw { message: 'SubCategory name already exists', responseCode: 409 };
    }

    Subcategory.subcat_name = subcat_name.trim();
    Subcategory.updated_by = userId;
    Subcategory.updated_at = Date.now();

    return await Subcategory.save();
};

module.exports = {
    createSubCategoryService,
    fetchAllSubCategoriesService,
    removeSubCategoryService,
    fetchSingleSubCategoryService,
    modifySubCategoryService
};
