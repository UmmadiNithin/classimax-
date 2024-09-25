const bcrypt = require('bcrypt');
const userSchema = require('../modals/userModel');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema,profileUpdateSchema } = require('../validations/userValidation');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        result: {},
        message: error.details[0].message,
        status: 'error',
        responseCode: 400
      });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        result: {},
        message: 'User already exists',
        status: 'error',
        responseCode: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userSchema({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      result: user,
      message: 'User registered successfully',
      status: 'success',
      responseCode: 201
    });
  } catch (err) {
    return res.status(500).json({
      result: {},
      message: 'Server error',
      status: 'error',
      responseCode: 500,
      error: err.message
    });
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                result: {},
                message: error.details[0].message,
                status: 'error',
                responseCode: 400
            });
        }

        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({
                result: {},
                message: 'Invalid email or password',
                status: 'error',
                responseCode: 400
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                result: {},
                message: 'Invalid email or password',
                status: 'error',
                responseCode: 400
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secretkey', 
            { expiresIn: '12h' }
        );

        return res.status(200).json({
            result: { token },
            message: 'Logged in successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (err) {
        console.error('Error logging in user:', err); 
        return res.status(500).json({
            result: {},
            message: 'Server error',
            status: 'error',
            responseCode: 500,
            error: err.message
        });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
      const { firstName, lastName, community_name, zipCode, phone_No, address } = req.body;
  console.log(req.body);
  
      const { error } = profileUpdateSchema.validate({
        firstName,
        lastName,
        community_name,
        zipCode,
        phone_No,
        address,
        image: req.files ? req.files.image : null, 
      });
  
      if (error) {
        return res.status(400).json({
          result: {},
          message: error.details[0].message,
          status: 'error',
          responseCode: 400,
        });
      }
  
      let imageBuffer = null;
      if (req.files && req.files.image) {
        const file = req.files.image;
        const base64Image = file.data.toString('base64');
        imageBuffer = Buffer.from(base64Image, 'base64');
      }
  
      const updateData = {
        firstName,
        lastName,
        community_name,
        zipCode,
        phone_No,
        address,
        updated_at: Date.now(),
      };
  
      if (imageBuffer) {
        updateData.image = imageBuffer;
      }
  
      const userId = req.user.id;
      console.log(userId);
      
      const updatedUser = await userSchema.findByIdAndUpdate(userId, updateData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({
          result: {},
          message: 'User not found',
          status: 'error',
          responseCode: 404,
        });
      }
  
      return res.status(200).json({
        result: updatedUser,
        message: 'Profile updated successfully',
        status: 'success',
        responseCode: 200,
      });
    } catch (err) {
      return res.status(500).json({
        result: {},
        message: 'Server error',
        status: 'error',
        responseCode: 500,
        error: err.message,
      });
    }
  
}