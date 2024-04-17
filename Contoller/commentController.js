const Comment = require('../Model/comment');

// Create a new comment
const createComment = async (req, res) => {
    const {content,postId,authorId } = req.body;
    try {
        if (!content) {
            return res.status(400).json({
                status: 400,
                message: 'content is required'
            });
        }

        const newComment = await Comment.create({
            content,postId,authorId
        });
        res.status(201).json({
            status: 201,
            message: "Comment created successfully",
            data: newComment
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Get all comments
const getAllComments= async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({ postId }).populate('authorId', 'name');;
        if (!comments || comments.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No comments found for the specified author'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved posts comments successfully',
            data: comments
        });
    } catch (error) {
        console.error('Error retrieving comments by author:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
    const id = req.params.id;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                status: 404,
                message: 'Comment not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Retrieved comment successfully',
            data: comment
        });
    } catch (error) {
        console.error('Error retrieving comment by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const {authorId} = req.body;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: 404,
                message: 'Comment not found'
            });
        }

        // Check if the requesting user is the author of the comment
        if (comment.authorId.toString() !== authorId) {
            return res.status(403).json({
                status: 403,
                message: 'You are not authorized to delete this comment'
            });
        }

        await comment.deleteOne();
        res.status(200).json({
            status: 200,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { content,authorId } = req.body;
 

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: 404,
                message: 'Comment not found'
            });
        }

        // Check if the requesting user is the author of the comment
        if (comment.authorId.toString() !== authorId) {
            return res.status(403).json({
                status: 403,
                message: 'You are not authorized to update this comment'
            });
        }

        // Update the comment
        comment.content = content;
        await comment.save();

        res.status(200).json({
            status: 200,
            message: 'Comment updated successfully',
            data: comment
        });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};




module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    deleteComment,
    updateComment
};
