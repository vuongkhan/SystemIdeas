const User = require('../models/User');
const Idea= require('../models/Idea')
// Get all users
const getUsers = async (req, res) => {
    try {
      // Retrieve all users from database
      const users = await User.find();
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const  getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
      // Retrieve all users from database
      const users = await User.findById(userId);
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 


// Create a new user
const createUser = async (req, res) => {
    try {
      const { email, fullname, gender, image, password, department, permission } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Create new user object
      const newUser = new User({
        email,
        fullname,
        gender,
        image,
        password,
        department,
        permission,
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Update user
  const updateUser = async (req, res) => {
    try {
      const { email, fullname, gender, image, password, department, permission } = req.body;
  
      // Check if user exists
      const existingUser = await User.findById(req.params.id).exec();
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user object
      existingUser.email = email;
      existingUser.fullname = fullname;
      existingUser.gender = gender;
      existingUser.image = image;
      existingUser.password = password;
      existingUser.department = department;
      existingUser.permission = permission;
  
      // Save updated user to database
      await existingUser.save();
  
      res.json(existingUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await User.findByIdAndDelete(req.params.id).exec();
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  };

  const getUserDepartment = async (req, res) => {
    const department = req.params.department; 
  
    try {
      const users = await User.find({ department: department });
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  };
  const getTotalUserDepartment = async (req, res) => {
    const department = req.params.department;
  
    try {
      const result = await User.countDocuments({ department: department });
  
      res.send({ total: result });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  };
  const getTotalIdeaByDepartment = async (req, res) => {
    const department = req.params.department;
    try {
      const users = await User.find({ department: department });
      const ideas = await Idea.find({ user_id: { $in: users.map(user => user._id) } });
  
      res.send({ total: ideas.length });
      console.log(ideas)
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  };
  const getTotalIdeasToday = async (req, res) => {
    const department = req.params.department;
    try {
      const today = new Date().toISOString().slice(0, 10);
      const users = await User.find({ department: department });
      const userIds = users.map(user => user._id);

      const result = await Idea.aggregate([
        {
          $match: {
            user_id: { $in: userIds },
            createdAt: {
              $gte: new Date(today),
              $lt: new Date(today + 'T23:59:59.999Z')
            }
          }
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 }
          }
        }
      ]);
      res.send({ total: result[0].count });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  };
module.exports={
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getTotalUserDepartment:getTotalUserDepartment,
    getUserDepartment:getUserDepartment,
    getTotalIdeaByDepartment:getTotalIdeaByDepartment,
    getTotalIdeasToday:getTotalIdeasToday,
}