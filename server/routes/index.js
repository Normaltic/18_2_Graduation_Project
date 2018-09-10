import lib_express from 'express';

import authRoute from './authRoute';
import boardRoute from './boardRoute';

import checkAuth from './utils/checkAuth';


const router = lib_express.Router();

router.use('/auth', authRoute);
router.use('/secret', checkAuth);
router.use('/secret/board', boardRoute);

import mockupRoute from './mockupRoute';
router.use('/mockup', mockupRoute);

export default router;
