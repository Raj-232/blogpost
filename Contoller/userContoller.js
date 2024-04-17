const Post = require('../Model/blogpost');
const Comment = require('../Model/comment');
const User = require('../Model/user');


// Get a single user by ID
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({
              status: 404,
              message: 'User not found'
          });
      }
      res.status(200).json({
          status: 200,
          message: 'Retrieved user successfully',
          data: user
      });
  } catch (error) {
      console.error('Error retrieving user by ID:', error);
      res.status(500).json({
          status: 500,
          message: 'Internal server error'
      });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).json({
              status: 404,
              message: 'User not found'
          });
      }
      await Comment.deleteMany({ authorId: id });
      await Post.deleteMany({ authorId: id });
      res.status(200).json({
          status: 200,
          message: 'User deleted successfully'
      });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
          status: 500,
          message: 'Internal server error'
      });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  try {
      const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
      if (!user) {
          return res.status(404).json({
              status: 404,
              message: 'User not found'
          });
      }
      res.status(200).json({
          status: 200,
          message: 'User updated successfully',
          data: user
      });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
          status: 500,
          message: 'Internal server error'
      });
  }
};

module.exports = {
    getUserById,
    deleteUser,
    updateUser,
   
}
