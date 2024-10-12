const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../modals/userModel');
const { generateOTP } = require('../helpers/otpGenerator');
const sendEmail = require('../utils/sendEmail');

const userService = {
  async registerUser(email, password,confirmPassword) {
    try {

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const existingUser = await userSchema.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userSchema.create({ email, password: hashedPassword });
      return user;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  },

  async loginUser(email, password) {
    try {
      const user = await userSchema.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '12h' }
      );
      return token;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  async updateUserProfile(userId, updateData, image) {
    try {
      updateData.updated_at = Date.now();

      if (image) {
        const base64Image = image.data.toString('base64');
        updateData.image = base64Image;
      }

      const updatedUser = await userSchema.findByIdAndUpdate(userId, updateData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error(`Profile update failed: ${error.message}`);
    }
  },

  async changeUserPassword(userId, oldPassword, newPassword) {
    try {
      const user = await userSchema.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        throw new Error('Old password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } catch (error) {
      throw new Error(`Password change failed: ${error.message}`);
    }
  },

  async changeUserEmail(userId, currentEmail, newEmail) {
    try {
      const user = await userSchema.findById(userId);
      if (!user || user.email !== currentEmail) {
        throw new Error('Current email does not match our records');
      }

      const existingEmail = await userSchema.findOne({ email: newEmail });
      if (existingEmail) {
        throw new Error('Email already in use');
      }

      await userSchema.findByIdAndUpdate(userId, { email: newEmail }, { new: true });
    } catch (error) {
      throw new Error(`Email change failed: ${error.message}`);
    }
  },

  async deleteUserAccount(userId) {
    try {
      await userSchema.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error(`Account deletion failed: ${error.message}`);
    }
  },

  async getUserProfile(userId) {
    try {
      const user = await userSchema.findById(userId).select('-password');
      if (!user) {
        throw new Error('User not found');
      }

      return {
        ...user.toObject(),
        image: user.image ? user.image.toString('base64') : null,
      };
    } catch (error) {
      throw new Error(`Profile retrieval failed: ${error.message}`);
    }
  },

  async forgotPassword(email) {
    try {
      const user = await userSchema.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const otp = generateOTP();
      const otpExpiry = Date.now() + 10 * 60 * 1000;

      user.otp = otp;
      user.otpExpiry = otpExpiry;

      await user.save();
      return { otp, otpExpiry };
    } catch (error) {
      throw new Error(`Failed to generate OTP: ${error.message}`);
    }
  },

  async resetPassword(email, otp, newPassword) {
    try {
      const user = await userSchema.findOne({ email });
      if (!user || !user.otp) {
        throw new Error('No OTP found for this user');
      }

      const storedOtp = user.otp.toString();
      const providedOtp = otp.toString().trim();
      if (storedOtp !== providedOtp) {
        throw new Error('Invalid OTP');
      }

      if (Date.now() > user.otpExpiry) {
        throw new Error('OTP has expired');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userSchema.findOneAndUpdate(
        { email },
        { password: hashedPassword, otp: undefined, otpExpiry: undefined }
      );
    } catch (error) {
      throw new Error(`Password reset failed: ${error.message}`);
    }
  },
};

module.exports = userService;
