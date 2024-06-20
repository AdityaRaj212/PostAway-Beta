import { PostModel } from "../posts/posts.schema.js";
import { LikeModel } from "./likes.schema.js";

export default class LikeRepository{
    async getLikesByPost(postId){
        try{
            const likes = await LikeModel.find({postId});
            return likes;
        }catch(err){
            console.log('Error while fetching likes for a post: ' + err);
            throw err;
        }
    }

    async toggleStatus(userId, postId){
        try{
            const postFound = await PostModel.exists({_id: postId});
            if(!postFound){
                return false;
            }

            const like = await LikeModel.findOne({userId, postId});

            if(like){
                await LikeModel.deleteOne({_id: like._id});
            }else{
                const newLike = new LikeModel({
                    userId,
                    postId
                });
                await newLike.save();
            }
            return true;
        }catch(err){
            console.log('Error while fetching like status: ' + err);
            throw err;
        }
    }

    async likesForAPost(postId){
        try{
            const likes = LikeModel.find({postId});
            return likes;
        }catch(err){
            console.log('Error while fetching likes for a post: ' + err);
            throw err;
        }
    }

    async postsLikedByUser(userId){
        try{
            const likes = LikeModel.find({userId});
            return likes;
        }catch(err){
            console.log('Error while getting posts liked by user: ' + err);
            throw err;
        }
    }

    async isLikedByUser(userId, postId){
        try{
            const like = LikeModel.findOne({userId, postId});
            return like? false : true;
        }catch(err){
            console.log('Error while getting posts liked by user: ' + err);
            throw err;
        }
    }
}