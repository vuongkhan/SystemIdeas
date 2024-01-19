const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  image: {
    type: String,
    required: false,
    default: 'default.jpg'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  department: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true
  },
  permission: {
    type: String,
    enum: ['QAManager', 'QA', 'Staff'],
    required: true
  }
}, { timestamps: true });

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (err) {
      return next(err);
    }
  }

  return next();
});

// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;