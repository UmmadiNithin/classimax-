const Joi = require('joi');

const addSubCategorySchema = Joi.object({
    subcat_name: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'SubCategory name must be a string',
        'string.empty': 'SubCategory name cannot be empty',
        'string.min': 'SubCategory name must be at least 2 characters long',
        'string.max': 'SubCategory name must not exceed 100 characters',
        'any.required': 'SubCategory name is required'
    }),
    categoryId: Joi.string().required().messages({
        'any.required': 'Category ID is required'
    })
});

const updateSubCategorySchema = Joi.object({
    subcat_name: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'SubCategory name must be a string',
        'string.empty': 'SubCategory name cannot be empty',
        'string.min': 'SubCategory name must be at least 2 characters long',
        'string.max': 'SubCategory name must not exceed 100 characters',
        'any.required': 'SubCategory name is required'
    }),
    categoryId: Joi.string().required().messages({
        'any.required': 'Category ID is required'
    })
});

module.exports = {
    addSubCategorySchema,
    updateSubCategorySchema,
};
