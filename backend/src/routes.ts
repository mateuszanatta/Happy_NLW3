import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';
import Users from './controllers/UsersController';
import multer from 'multer';

import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);
//Métodos HTTP
// GET - Buscar uma informação
// POST - Criando uma informação
// PUT - Editando uma informação
// DELETE - Deletando uma informação

//Parâmetros
// Query Params: http://localhost?searchby=Mateus
// Route Params: http://localhost/users/1 (identificar um recurso)
// Body: http://localhost/users/1 (dados de formulário, informações com muitos dados)

//Orphanages
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id',OrphanagesController.show);

//Users
routes.get('/users', Users.index);
routes.post('/users', Users.create);
routes.post('/users/login', Users.login);

export default routes;