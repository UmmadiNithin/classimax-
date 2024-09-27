const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: Schema.Types.ObjectId,
    required: true
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

CategorySchema.virtual('subcategories', {
  ref: 'SubCategory',
  localField: '_id',  
  foreignField: 'categoryId',  
  justOne: false 
});

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Category', CategorySchema);
