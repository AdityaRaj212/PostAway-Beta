import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import userRouter from './users/users.routes.js';
import postRouter from './posts/posts.routes.js';
import commentRouter from './comments/comments.routes.js';
import likesRouter from './likes/likes.routes.js';
import jwtAuth from './middlewares/jwt.middleware.js';
import { uploadFile } from './middlewares/fileUpload.middleware.js';


const server = express();

server.use(express.urlencoded({extended:true}));
server.use(cors());
server.use(express.static(path.join(`${path.resolve()}`, '../public')));

// console.log('Path: '+path.join(`${path.resolve()}`, '../public'));
server.use('/public/uploads', express.static(path.join(path.resolve(), 'public/uploads')));
// console.log(path.resolve());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret: 'aditya',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/comments', jwtAuth, commentRouter);
server.use('/api/likes', jwtAuth, likesRouter);

// Serve static files from the React app
server.use(express.static(path.join(path.resolve(), 'front-end/build')));

// Serve React app for any unknown routes
server.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'front-end/build', 'index.html'));
});

server.listen(3200,()=>{
    console.log('Server is up and running at 3200');
})