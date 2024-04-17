const Post = require('../Model/blogpost');
const Comment = require('../Model/comment');

// Create a new post
const createPost = async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        if (!title) {
            return res.status(400).json({
                status: 400,
                message: 'Title is required'
            });
        }

        const newPost = await Post.create({
            title,
            content,
            authorId
        });
        res.status(201).json({
            status: 201,
            message: "Post created successfully",
            data: newPost
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Get all posts by author ID
const getAllPostsByAuthor = async (req, res) => {
    const authorId = req.params.authorId;
    try {
        const posts = await Post.find({ authorId });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No posts found for the specified author'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved posts by author successfully',
            data: posts
        });
    } catch (error) {
        console.error('Error retrieving posts by author:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

//get all posts

const getAllPosts = async (req, res) => {
    try {
        const post = await Post.find();
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved post successfully',
            data: post
        });
    } catch (error) {
        console.error('Error retrieving post:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};


// Get a single post by ID


const getPostById = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved post successfully',
            data: post
        });
    } catch (error) {
        console.error('Error retrieving post by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: 'Post not found'
            });
        }
        await Comment.deleteMany({ postId: id });
        await post.deleteOne();
        res.status(200).json({
            status: 200,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, content, authorId } = req.body;
    try {
        if (!title || !content) {
            return res.status(400).json({
                status: 400,
                message: 'Title and content are required'
            });
        }
        const post = await Post.findByIdAndUpdate(id, {
            title,
            content,
            authorId
        }, { new: true });
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Post updated successfully',
            data: post
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getAllPostsByAuthor,
    getPostById,
    deletePost,
    updatePost
};
