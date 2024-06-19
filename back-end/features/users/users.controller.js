import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import UserModel from "./users.model.js";
import transporter from '../../middlewares/emailTransporter.middleware.js';

export default class UserController{
    signUp(req,res,next){
        const {name,email,password} = req.body;
        const newUser = UserModel.addUser(name,email,password);
        res.status(201).send(newUser);
    }

    signIn(req,res,next){
        const {email,password} = req.body;
        const user = UserModel.getUser(email,password);
        if(user){
            const token = jwt.sign(
                {
                    userId: user.userId,
                    email: user.email
                },
                'secret',
                {
                    expiresIn: '24h'
                }
            );
            res.cookie('jwtToken',token,{
                maxAge: 24*60*60*1000
            });
            res.cookie('userId',user.userId,{
                maxAge: 24*60*60*1000
            })
            res.cookie('userInfo',JSON.stringify(user),{
                maxAge: 24*60*60*1000
            });
            res.status(200).send({
                jwtToken: token,
                user: user
            });
            // console.log('signed in');
        }else{
            res.status(401).send('Invalid credentials');
        }
    }

    getUserFromId(req,res,next){
        const userId = req.params.userId;
        const user = UserModel.getOneUser(userId);
        res.status(200).send(user);
    }

    getUserIdOfLoggedInUser(req,res,next){
        if(req.cookies.userId){
            res.status(200).send(req.cookies.userId);
        }else{
            res.status(500).send('Login first');
        }
    }

    addFollower(req,res,next){
        const currUserId = req.cookies.userId;
        const userId = req.params.userId;
        UserModel.addFollower(currUserId,userId);
        res.status(201).send('Follower added');
    }

    removeFollowing(req,res,next){
        const currUserId = req.cookies.userId;
        const userId = req.params.userId;
        UserModel.removeFollowing(currUserId,userId);
        res.status(201).send('Following removed');
    }

    removeFollower(req,res,next){
        const currUserId = req.cookies.userId;
        const userId = req.params.userId;
        UserModel.removeFollower(currUserId,userId);
        res.status(201).json({message: 'Follower removed'});
    }

    getIsFollower(req,res,next){
        const currUserId = req.cookies.userId;
        const userId = req.params.userId;
        const result = UserModel.isFollower(currUserId,userId);
        res.status(200).send(result);
    }

    async sendOtp(req,res,next){
        const {email} = req.body;
        const userId = req.cookies.userId;
        const otp = crypto.randomInt(1000,9999).toString();
        const otpExpires = Date.now() + 5*60*1000; // valid for 5 minutes

        try{
                UserModel.setOtp(userId,email,otp,otpExpires);

                await transporter.sendMail({
                    to: email,
                    subject: 'Your OTP',
                    text: `Your OTP code is ${otp}`
                });

                res.status(200).json({message: 'OTP sent'});
        }catch(err){
            console.log('Error while sending OTP: '+err);
            res.status(500).json({error: 'Error sending OTP'});
        }
    }

    async verifyOtp(req,res,next){
        const {email, otp} = req.body;
        const userId = req.cookies.userId;

        try{
            const isValid =  UserModel.verifyOtp(userId,email,otp);
            if(isValid){
                res.status(200).json({message: 'OTP verified'});
            }else{
                console.log('error');
                res.status(400).json({error: 'Invalid or expired OTP'});
            }
        }catch(err){
            console.log('Error verifying OTP: ' + err);
            res.status(500).json({error: "Error verifying OTP"});
        }
    }

    changeUserName(req,res,next){
        const {newUserName} = req.body;
        const userId = req.cookies.userId;
        UserModel.newUserName(userId, newUserName);
        res.status(201).json({message: "UserName updated successfully"});
    }
}