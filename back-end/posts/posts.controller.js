import PostModel from "./posts.model.js";

export default class PostController{
    getAllPosts(req,res,next){
        const posts = PostModel.getAllPosts();
        if(posts){
            res.status(200).send(posts);
        }else{
            res.status(500).send('No post found');
        }
    }

    getOnePost(req,res,next){
        const postId = req.params.id;
        const post = PostModel.getPostById(postId);
        if(post){
            res.status(200).send(post);
        }else{
            res.status(500).send('No such post found');
        }
    }

    getUserPosts(req,res,next){
        const userId = req.cookies.userId;
        const posts = PostModel.getPostsByUserId(userId);
        console.log(posts);
        if(posts){
            res.status(200).send(posts);
        }else{
            res.status(500).send("Looks like its time to create your first post");
        }
    }

    createAPost(req,res,next){
        const userInfo = req.cookies.userInfo;
        console.log(userInfo);
        const parsedInfo = JSON.parse(userInfo);
        console.log(parsedInfo);
        const userId = parsedInfo.userId;
        console.log(req.body);
        console.log(req.file);
        const {caption} = req.body;
        const imagePath = req.file.path;
        PostModel.createPost(userId,caption,imagePath);
        res.status(201).redirect('/');
    }

    deleteAPost(req,res,next){
        const postId = req.params.id;
        const deleteResult = PostModel.deletePost(postId);
        if(deleteResult){
            res.status(201).send('Post deleted successfully');
        }else{
            res.status(500).send('Post not found');
        }
    }

    updateAPost(req,res,next){
        const userId = req.cookies.userId;
        const postId = req.params.postId;
        const {caption} = req.body;
        let imagePath = req.body.imagePath;
        if(req.file){
            imagePath = req.file.path;
        }
        const updateResult = PostModel.updatePost(userId,postId,caption,imagePath);
        if(updateResult){
            res.status(201).send(updateResult);
        }else{
            res.status(500).send('Post not found');
        }
    }

    getUserFromPost(req,res,next){
        const postId = req.params.postId;
        const user = PostModel.getUsersByPost(postId);
        res.status(200).send(user);
    }
}