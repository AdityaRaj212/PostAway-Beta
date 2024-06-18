import express from 'express';
import PostController from './posts.controller.js';
import { uploadFile } from '../middlewares/fileUpload.middleware.js';

const router = express.Router();

const postController = new PostController();

router.get('/all',postController.getAllPosts);
router.get('/:id',postController.getOnePost);
router.get('/',postController.getUserPosts);
router.post('/',uploadFile.single('imagePath'),postController.createAPost);
router.delete('/:id',postController.deleteAPost);
router.put('/:postId', uploadFile.single('imagePath') ,postController.updateAPost);
router.get('/user/:postId',postController.getUserFromPost);

export default router;