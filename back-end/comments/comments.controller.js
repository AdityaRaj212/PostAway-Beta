import CommentModel from "./comments.model.js";

export default class CommentController{
    getAllComments(req,res,next){
        const postId = req.params.postId;
        const comments = CommentModel.getComments(postId);
        if(comments){
            res.status(200).send(comments);
        }else{
            res.status(500).send('No comment found');
        }
    }

    createComment(req,res,next){
        const userId = req.userId;
        const postId = req.params.postId;
        const content = req.body.content;
        const newComment = CommentModel.addComment(userId,postId,content);
        if(newComment){
            res.status(201).send(newComment);
        }else{
            res.status(500).send('Failed to post comment');
        }
    }

    updateComment(req,res,next){
        const userId = req.userId;
        const content = req.body.content;
        const commentId = req.params.id;
        const updateResult = CommentModel.updateComment(userId,commentId, content);
        if(updateResult){
            res.status(201).send(updateResult);
        }else{
            res.status(500).send('Comment not found');
        }
    }

    deleteComment(req,res,next){
        const userId = req.userId;
        const commentId = req.params.id;
        const deleteResult = CommentModel.deleteComment(commentId,userId);
        if(deleteResult){
            res.status(201).send('Comment deleted successfully');
        }else{
            res.status(500).send('Comment not found');
        }
    }

    getCommentsForAPost(req,res,next){
        const postId = req.params.postId;
        const comments = CommentModel.commentsForAPost(postId);
        res.status(200).send(comments);
    }
}