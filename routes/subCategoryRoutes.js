const express = require('express');
const {
    addSubCategory,
    getAllSubCategories,
    deleteSubCategory,
    getSingleSubCategory,
    updateSubCategory
} = require('../controllers/subCategoryController');
const authenticateToken = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/categoryvalidationMiddleware');
const { addSubCategorySchema, updateSubCategorySchema } = require('../validations/subCategoryValidation');

const router = express.Router();

// Routes
router.post('/addSubCategory', authenticateToken, validate(addSubCategorySchema), addSubCategory);
router.get('/getAllSubCategories', authenticateToken, getAllSubCategories);
router.delete('/deleteSubCategory/:SubcategoryId', authenticateToken, deleteSubCategory);
router.get('/getSingleSubCategory/:id', authenticateToken, getSingleSubCategory);
router.put('/updateSubCategory/:id', authenticateToken, validate(updateSubCategorySchema), updateSubCategory);

module.exports = router;
