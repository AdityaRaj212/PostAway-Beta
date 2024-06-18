import express from 'express';
import CommentController from './comments.controller.js';

const router = express.Router();

const commentController = new CommentController();

router.get('/:postId',commentController.getAllComments);
router.get('/comments-for-a-post/:postId',commentController.getCommentsForAPost);
router.post('/:postId',commentController.createComment);
router.put('/:id',commentController.updateComment);
router.delete('/:id',commentController.deleteComment);

export default router;
