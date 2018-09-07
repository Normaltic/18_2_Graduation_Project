import lib_express from 'express';

import lectureModel from './models/lectureModel';

const route = lib_express.Router();

/*
route.get('/keke', (req, res) => {

	let normal = new Lecture({
		lNum: 310032,
		lName: '캡스톤디자인1',
		lTeacher:'김동현'
	});

	normal.save()
	.then( (result) => {
		res.status(200).json({
			result
		});
	})
	.catch( (err) => {
		res.status(500).json(err);
	});
});*/

route.post('/', (req, res) => {
	let { id, pw } = req.body;
	let error = "";

	if( !id ) return res.status(400).json({
		error: "INVALID ID"
	});

	if( !pw ) return res.status(400).json({
		error: "INVALID PASSWORD"
	});

	User.findOne({ uNum: id })
	.then( (user) => {
		return new Promise( (resolve, reject) => {
			if( !user ) reject( {err:"NOT_EXIST_USER", code:404} );
			if( !user.checkHash(pw) ) reject( {err:"WRONG PASSWORD", code: 401} );

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
					resolve({
						token: token,
						uNum: user.uNum,
						uName: user.uName,
						is_teacher: user.is_teacher
					});
				}
			)

		});
	})
	.then( ({token, uNum, uName, is_teacher}) => {
		res.status(200).json({
			token,
			uNum,
			uName,
			is_teacher
		});
	})
	.catch( ({err, code = 500}) => {
		res.status(code).json({
			error: err
		});
	});
})

export default route;
