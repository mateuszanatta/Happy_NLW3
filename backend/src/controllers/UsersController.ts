import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import userView from '../views/user_view';


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

            return response.status(201).json({user});
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
                return response.status(200).json({ error: 'Invalid password!'});
            
            return response.json({
                user: userView.render(user),
                token: user.generateToken()
            });
        } catch(error){
            return response.status(400).json({ error: 'User authentication failed'});
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
    }
}