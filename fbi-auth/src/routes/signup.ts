import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {User} from '../models/user';
import {BadRequestError, validateRequest} from '@sweettech123/common';
import {UserCreatedPublisher} from '../events/publishers/UserCreatedPublisher';
import {natsWrapper} from '../nats-wrapper';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/api/users/signup', [
body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage('Password mustbe between 2 to 20 chr')
],
validateRequest, 
async(req:Request, res:Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser) {
        throw new BadRequestError('Email address already exists.')
    }

    const user = User.build({email, password});
    await user.save();

    // Generate JWT 
    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);
    
    // Set to the cookie session
    req.session = {
        jwt: userJWT
    };

    // Publish the event 
    try {
        new UserCreatedPublisher(natsWrapper.client).publish({
            id: user.id,
            email:user.email,
            password:password
        });
    } catch (error) {
        console.error(error);
    }
    
    res.status(201).send(user);
})

export {router as signupRouter};