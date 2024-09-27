const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  subcat_name: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Foreign key reference to Category
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

module.exports = mongoose.model('SubCategory', SubCategorySchema);