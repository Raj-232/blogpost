const express = require('express');
const router = express.Router();
const blogPostController = require('../Contoller/blogPostController');
const userContoller = require('../Contoller/userContoller');
const commentController =require('../Contoller/commentController')
const authController=require('../Contoller/authController')
const { authenticateToken } = require('../Middleware/authMiddleware');



router.post('/user/signin', authController.userLogin);
router.post('/user/signup', authController.createUser);



router.get('/user/:id',authenticateToken, userContoller.getUserById);
router.put('/user/:id',authenticateToken, userContoller.updateUser);
router.delete('/user/:id',authenticateToken, userContoller.deleteUser);


router.post('/blogpost', authenticateToken, blogPostController.createPost);
router.get('/blogpost', authenticateToken, blogPostController.getAllPosts);
router.get('/user/blogpost/:authorId', authenticateToken, blogPostController.getAllPostsByAuthor);
router.get('/blogpost/:id', authenticateToken, blogPostController.getPostById);
router.delete('/blogpost/:id', authenticateToken, blogPostController.deletePost);
router.put('/blogpost/:id', authenticateToken, blogPostController.updatePost);


router.post('/postcomment', authenticateToken, commentController.createComment);
router.get('/post/postcomment/:postId', authenticateToken, commentController.getAllComments);
router.get('/postcomment/:id', authenticateToken, commentController.getCommentById);
router.delete('/postcomment/:id', authenticateToken, commentController.deleteComment);
router.put('/postcomment/:id', authenticateToken, commentController.updateComment);

module.exports = router;