import lib_express from 'express';
import lib_jwt from 'jsonwebtoken';

import User from './models/userModel';
import Lecture from './models/lectureModel';

const route = lib_express.Router();

route.post('/', (req, res) => {
	let { id, pw } = req.body;
	let error = "";

	if( !id ) return res.status(400).json({
		message: "INVALID ID"
	});

	if( !pw ) return res.status(400).json({
		message: "INVALID PASSWORD"
	});

	const createToken = (user) => {
		return new Promise( (resolve, reject) => {

			lib_jwt.sign(
				{
					uNum: user.uNum,
					uName: user.uName,
					is_teacher: user.is_teacher
				},
				req.app.get('jwt-secret'),
				{
					expiresIn: '7d',
					issuer: 'NormalticPansor',
					subject: 'userToken'
				}, (err, token) => {
					if( err ) reject(err);

					user.token = token;
					delete user._id;

					resolve(user);
				}
			)
		});
	}

	User.findByNumber(id)
	.then( (user) => {
		if( !user ) return Promise.reject( {message:"NOT_EXIST_USER", code:404} );
		if( !user.checkHash(pw) ) return Promise.reject( {message:"WRONG PASSWORD", code: 401} );

		return Promise.all([
			createToken(user),
			Lecture.findLectureList(user.lectureList)
		]);
	})
	.then( (result) => {
		res.status(200).json({
			token: result[0].token,
			userInfo: {
				uNum: result[0].uNum,
				uName: result[0].uName,
				is_teacher: result[0].is_teacher
			},
			lectureList: result[1]
		});
	})
	.catch( ({message, code = 500 })  => {
		res.status(code).json({
			error: message
		});
	});
})

export default route;
