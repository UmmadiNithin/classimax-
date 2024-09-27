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

module.exports = mongoose.model('Category', CategorySchema);

