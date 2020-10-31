import * as jwt from 'jsonwebtoken';
import {promisify} from 'util';
import {NextFunction, Request, Response} from 'express';


export default{
    async auth(request: Request, response: Response, next: NextFunction){

        const authHeader = request.headers.authorization;

        if(!authHeader){
            return response.status(401).send({error: 'No token provided'});
        }

        const [scheme, token] = authHeader.split(" ");

        try{
            const decoded = await promisify(jwt.verify)(token, "secret");
            
            request.body.userId = decoded;

            return next();
        }catch (error){
            return response.status(401).send({error: 'Token invalid'});
        }
    }
}