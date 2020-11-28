import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';
import * as crypto from 'crypto';

import User from '../models/User';
import userView from '../views/user_view';
import mailer from '../modules/mailer';


export default {
    async index( request: Request, response: Response){
        const usersRepository = getRepository(User);
        const users = await usersRepository.find();

        return response.json(userView.renderMany(users));
    },
    async create(request: Request, response: Response){
        //destructure request body
        const {
            name,
            email,
            password
        } = request.body;
        try{
            const usersRepository = getRepository(User);

            const data = {
                name,
                email,
                password
            };

            //Verify required fields
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            });

            //make necessaty casting
            const finalData = schema.cast(data);

            //validate received data
            await schema.validate(data, {
                abortEarly: false
            });

            if(await usersRepository.findOne({ email })){
                return response.status(400).json({error: 'User already exists'});
            }

            //create user
            const user = usersRepository.create(data);

            //persists user in the repository
            await usersRepository.save(user);

            return response.status(201).json({user: userView.render(user)});
        }catch(error){
            return response.status(400).json({error: "User registration failed!"})
        }
    },

    async login(request: Request, response: Response){
        try{
            const {
                email,
                password
            } = request.body;

            const usersRepository = getRepository(User);

            const user = await usersRepository.findOne({
                where: [{ email: email}]
            });

            if (!user) {
                return response.status(404).json({ error: "User not found" });
            }

            if (!(await user.compareHash(password)))
                return response.status(400).json({ error: 'Invalid password!'});
            
            return response.json({
                user: userView.render(user),
                token: user.generateToken()
            });
        } catch(error){
            return response.status(400).json({ error: 'User authentication failed'});
        }
    },

    async forgotPassword(request: Request, response: Response){
        const { email } = request.body;

        try{
            const usersRepository = getRepository(User);
            const user = await usersRepository.findOne({email});
            
            if (!user) {
                return response.status(404).json({ error: "User not found" });
            }
            //create token to retrieve password
            const token = crypto.randomBytes(20).toString('hex');

            //define an expiration time of 1 hour from now
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await usersRepository.createQueryBuilder()
                                    .update(User)
                                    .set({
                                        password_reset_token: token,
                                        password_reset_expires: now,
                                    })
                                    .where("id = :id", {id : user.id})
                                    .execute();
            
            mailer.createEmail().sendMail({
                to: email,
                from: 'mateus_zanatta@hotmail.com',
                html: `<p>Please use this token ${token} to recover your password</p>`,
            }, (error) => {
                if(error){
                    return response.status(400).json({error: 'Cannot send your recovering token'})
                }

                return response.send();
            });
        }catch(error){
            response.status(400).json({error: 'Error on retrieving your Password. Please, try again'});
        }
    },

    async user(request: Request, response: Response){
        try{
            const { id } = request.params;

            const usersRepository = getRepository(User);

            const user = await usersRepository.findOne(id);

            return response.json({user: userView.render(user)})
        }catch(error){
            return response.status(400).json({error: "Can't get user information"})
        }
    },

    async resetPassword(request: Request, response: Response){
        const { email, token, password } = request.body;

        try{
            const usersRepository = getRepository(User);
            const user = await usersRepository.findOne({email});
            
            if (!user) {
                return response.status(404).json({ error: "User not found" });
            }

            if(token !== user.password_reset_token){
                return response.status(400).json({error: 'Token invalid'});
            }

            const now = new Date();

            if (now > user.password_reset_expires){
                return response.status(400).json({error: 'Token expired'});
            }

            user.password = password;

            usersRepository.save(user)

            return response.send();
        }catch(error){
            response.status(400).json({error: 'Cannot reset password, try again'});
        }
    }
}