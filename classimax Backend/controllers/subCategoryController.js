const {
    createSubCategoryService,
    fetchAllSubCategoriesService,
    removeSubCategoryService,
    fetchSingleSubCategoryService,
    modifySubCategoryService
} = require('../services/subCategoryService');

const addSubCategory = async (req, res) => {
    try {
        const { subcat_name, categoryId } = req.body;
        const userId = req.user.id;

        
        const subcategory = await createSubCategoryService(subcat_name, categoryId, userId);

        return res.status(201).json({
            result: subcategory,
            message: 'SubCategory created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: 500
        });
    }
};

const getAllSubCategories = async (req, res) => {
    try {
        const Subcategories = await fetchAllSubCategoriesService();
        return res.status(200).json({
            result: Subcategories,
            message: 'SubCategories retrieved successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'Server Error',
            status: 'error',
            responseCode: 500,
        });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const { SubcategoryId } = req.params;
        const userId = req.user.id;

        await removeSubCategoryService(SubcategoryId, userId);

        return res.status(200).json({
            result: {},
            message: 'SubCategory deleted successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(error.responseCode || 500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: error.responseCode || 500,
        });
    }
};

const getSingleSubCategory = async (req, res) => {
    try {
        const SubcategoryId = req.params.id;
        const userId = req.user.id;
        const Subcategory = await fetchSingleSubCategoryService(SubcategoryId, userId);

        return res.status(200).json({
            result: Subcategory,
            message: 'SubCategory fetched successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(error.responseCode || 500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: error.responseCode || 500,
        });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const SubcategoryId = req.params.id;
        const { subcat_name } = req.body;
        const userId = req.user.id;
        const Subcategory = await modifySubCategoryService(SubcategoryId, subcat_name, userId);

        return res.status(200).json({
            result: Subcategory,
            message: 'SubCategory updated successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(error.responseCode || 500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: error.responseCode || 500,
        });
    }
};

module.exports = {
    addSubCategory,
    getAllSubCategories,
    deleteSubCategory,
    getSingleSubCategory,
    updateSubCategory
};
