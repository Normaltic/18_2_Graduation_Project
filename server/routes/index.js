import lib_express from 'express';

import authRoute from './authRoute';
import lectureRoute from './lectureRoute';
import boardRoute from './boardRoute';

import checkAuth from './utils/checkAuth';


const router = lib_express.Router();

router.use('/auth', authRoute);
router.use('/secret', checkAuth);
router.use('/secret/lecture', lectureRoute);
router.use('/secret/board', boardRoute);

import mockupRoute from './mockupRoute';
router.use('/mockup', mockupRoute);

export default router;
