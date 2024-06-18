import LikeModel from "./likes.model.js";

export default class LikesController{
    getLikes(req,res,next){
        const postId = req.params.postId;
        const likes = LikeModel.getLikesByPost(postId);
        if(likes){
            res.status(200).send(likes);
        }else{
            res.status(500).send('This post has received 0 likes');
        }
    }

    toggleLike(req,res,next){
        const userId = req.userId;
        const postId = req.params.postId;
        const likeResult = LikeModel.toggleStatus(userId,postId);
        if(likeResult){
            res.status(201).send('Action complete');
        }else{
            res.status(500).send('Post not found');
        }
    }

    getLikesForAPost(req,res,next){
        const postId = req.params.postId;
        const likes = LikeModel.likesForAPost(postId);
        res.status(200).send(likes);
    }

    getPostIdsLikedByUser(req,res,next){
        const userId = req.cookies.userId;
        const likes = LikeModel.postsLikedByUser(userId);
        res.status(200).send(likes);
    }

    getIsLikedByUser(req,res,next){
        const userId = req.cookies.userId;
        const postId = req.params.postId;
        const liked = LikeModel.isLikedByUser(userId,postId);
        res.status(200).send(liked);
    }
}