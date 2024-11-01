
 const userSchema = require('./modals/userModel');
 const CategorySchema  = require('./modals/categoryModel');
 const SubCategorySchema  = require('./modals/subCategoryModel');
const express = require('express');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const categoryRoutes=require('./routes/categoryRoutes')
const subCategoryRoutes=require('./routes/subCategoryRoutes')

const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json()); 
app.use(fileUpload()); 

// Routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subCategory', subCategoryRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



