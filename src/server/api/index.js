import { Router } from 'express';
import userAPI from './user.js';

const api = Router()

api.use('/user', userAPI)

export default api;