import express from 'express';
import LikesController from './likes.controller.js';

const router = express.Router();

const likeController = new LikesController();

router.get('/posts-liked-by-user',likeController.getPostIdsLikedByUser);
router.get('/toggle/:postId',likeController.toggleLike);
router.get('/likes-for-a-post/:postId',likeController.getLikesForAPost);
router.get('/is-liked-by-user/:postId',likeController.getIsLikedByUser);
router.get('/:postId',likeController.getLikes);

export default  router;