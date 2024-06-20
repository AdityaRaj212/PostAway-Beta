import PostModel from "./posts.model.js";
import PostRepository from "./posts.repository.js";

export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }

    async getAllPosts(req,res,next){
        const posts = await this.postRepository.getAllPosts();
        if(posts){
            res.status(200).send(posts);
        }else{
            res.status(500).send('No post found');
        }
    }

    async getOnePost(req,res,next){
        const postId = req.params.id;
        const post = await this.postRepository.getPostById(postId);
        if(post){
            res.status(200).send(post);
        }else{
            res.status(500).send('No such post found');
        }
    }

    async getUserPosts(req,res,next){
        const userId = req.cookies.userId;
        const posts = await this.postRepository.getPostsByUserId(userId);
        console.log(posts);
        if(posts){
            res.status(200).send(posts);
        }else{
            res.status(500).send("Looks like its time to create your first post");
        }
    }

    async createAPost(req,res,next){
        const userInfo = req.cookies.userInfo;
        console.log(userInfo);
        const parsedInfo = JSON.parse(userInfo);
        console.log(parsedInfo);
        const userId = parsedInfo._id;
        console.log(req.body);
        console.log(req.file);
        const {caption} = req.body;
        const imagePath = req.file ? `/public/uploads/${req.file.filename}` : "";
        await this.postRepository.createPost(userId,caption,imagePath);
        res.status(201).redirect('/');
    }

    async deleteAPost(req,res,next){
        const postId = req.params.id;
        const deleteResult = await this.postRepository.deletePost(postId);
        if(deleteResult){
            res.status(201).send('Post deleted successfully');
        }else{
            res.status(500).send('Post not found');
        }
    }

    async updateAPost(req,res,next){
        const userId = req.cookies.userId;
        const postId = req.params.postId;
        const {caption} = req.body;
        let imagePath = req.body.imagePath;
        if(req.file){
            imagePath = req.file.path;
        }
        const updateResult = await this.postRepository.updatePost(userId,postId,caption,imagePath);
        if(updateResult){
            res.status(201).send(updateResult);
        }else{
            res.status(500).send('Post not found');
        }
    }

    async getUserFromPost(req,res,next){
        const postId = req.params.postId;
        const user = await this.postRepository.getUsersByPost(postId);
        res.status(200).send(user);
    }

    async getOneUserPosts(req,res,next){
        const userId = req.params.userId;
        const posts = await this.postRepository.getPostsByUserId(userId);
        res.status(200).send(posts);
    }
}