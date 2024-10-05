const express = require('express');
const {
    addCategory,
    getAllCategories,
    deleteCategory,
    getSingleCategory,
    updateCategory
} = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/categoryvalidationMiddleware');
const { addCategorySchema, updateCategorySchema } = require('../validations/categoryValidation');

const router = express.Router();

// Routes
router.post('/addCategory', authenticateToken, validate(addCategorySchema), addCategory);
router.get('/getAllCategories', authenticateToken, getAllCategories);
router.delete('/deleteCategory/:categoryId', authenticateToken, deleteCategory);
router.get('/getSingleCategory/:id', authenticateToken, getSingleCategory);
router.put('/updateCategory/:id', authenticateToken, validate(updateCategorySchema), updateCategory);

module.exports = router;
