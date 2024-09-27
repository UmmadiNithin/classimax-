const {
    createCategoryService,
    fetchAllCategoriesService,
    removeCategoryService,
    fetchSingleCategoryService,
    modifyCategoryService
} = require('../services/categoryService');

const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
      
        const userId = req.user.id;
        
        
        const category = await createCategoryService(category_name, userId);

        return res.status(201).json({
            result: category,
            message: 'Category created successfully',
            status: 'success',
            responseCode: 201,
        });
        
    } catch (error) {
        console.error('Error:', error.message); 

        return res.status(500).json({
            result: {},
            message: 'Server Error',
            status: 'error',
            responseCode: 500,
        });
    }
};

// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await fetchAllCategoriesService();
//         return res.status(200).json({
//             result: categories,
//             message: 'Categories retrieved successfully',
//             status: 'success',
//             responseCode: 200,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             result: {},
//             message: 'Server Error',
//             status: 'error',
//             responseCode: 500,
//         });
//     }
// };


const getAllCategories = async (req, res) => {
    try {
        const categories = await fetchAllCategoriesService();
        return res.status(200).json({
            result: categories,
            message: 'Categories retrieved successfully',
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

// const deleteCategory = async (req, res) => {
//     try {
//         const { categoryId } = req.params;
//         const userId = req.user.id;

//         await removeCategoryService(categoryId, userId);

//         return res.status(200).json({
//             result: {},
//             message: 'Category deleted successfully',
//             status: 'success',
//             responseCode: 200,
//         });
//     } catch (error) {
//         return res.status(error.responseCode || 500).json({
//             result: {},
//             message: error.message || 'Server Error',
//             status: 'error',
//             responseCode: error.responseCode || 500,
//         });
//     }
// };

// const getSingleCategory = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const userId = req.user.id;
//         const category = await fetchSingleCategoryService(categoryId, userId);

//         return res.status(200).json({
//             result: category,
//             message: 'Category fetched successfully',
//             status: 'success',
//             responseCode: 200,
//         });
//     } catch (error) {
//         return res.status(error.responseCode || 500).json({
//             result: {},
//             message: error.message || 'Server Error',
//             status: 'error',
//             responseCode: error.responseCode || 500,
//         });
//     }
// };

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const userId = req.user.id;

        await removeCategoryService(categoryId, userId);

        return res.status(200).json({
            result: {},
            message: 'Category and its subcategories deleted successfully',
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


const getSingleCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const userId = req.user.id;
        const category = await fetchSingleCategoryService(categoryId, userId);

        return res.status(200).json({
            result: category,
            message: 'Category fetched successfully',
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

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { category_name } = req.body;
        const userId = req.user.id;
        const category = await modifyCategoryService(categoryId, category_name, userId);

        return res.status(200).json({
            result: category,
            message: 'Category updated successfully',
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
    addCategory,
    getAllCategories,
    deleteCategory,
    getSingleCategory,
    updateCategory
};
