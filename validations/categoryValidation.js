const Joi = require('joi');

const addCategorySchema = Joi.object({
    category_name: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'Category name must be a string',
        'string.empty': 'Category name cannot be empty',
        'string.min': 'Category name must be at least 2 characters long',
        'string.max': 'Category name must not exceed 100 characters',
        'any.required': 'Category name is required'
    }),
});

const updateCategorySchema = Joi.object({
    category_name: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'Category name must be a string',
        'string.empty': 'Category name cannot be empty',
        'string.min': 'Category name must be at least 2 characters long',
        'string.max': 'Category name must not exceed 100 characters',
        'any.required': 'Category name is required'
    }),
});

module.exports = {
    addCategorySchema,
    updateCategorySchema,
};
