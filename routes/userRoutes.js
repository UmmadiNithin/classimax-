const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
const  authenticateToken= require('../middlewares/authMiddleware');

const router = express.Router();



router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/updateProfile', authenticateToken, updateUserProfile);


module.exports = router;
