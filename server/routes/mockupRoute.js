import lib_express from 'express';
import lib_bcrypt from 'bcryptjs';
import moment from 'moment-timezone';

import User from './models/userModel';
import Lecture from './models/lectureModel';
import Board from './models/boardModel';

import BoardContent from './models/boardContentModel';
import SubmitContent from './models/submitContentModel';
import Memo from './models/memoModel'; 

const route = lib_express.Router();

route.get('/keke', (req, res) => {

	let hash = (pw) => {
		return lib_bcrypt.hashSync(pw, 10);
	};

	let userList = [
		new User({
			uNum: '20121746',
			uName: 'KIM YUNJI',
			password: hash("1234"),
			lectureList: [
				310032,320375,110101,110102
			]
		}),
		new User({
			uNum: '20130001',
			uName: 'CHOI JINHYEOK',
			password: hash("1234"),
			lectureList: [
				310032,320375,110101,110102
			]
		}),
		new User({
			uNum: '20130002',
			uName: 'WI SEUNGHYUN',
			password: hash("1234"),
			lectureList: [
				310032,320375,110101,110102
			]
		}),
		new User({
			uNum: '20130003',
			uName: 'SEONG BONGGYU',
			password: hash("1234"),
			lectureList: [
				310032,320375,110101,110102
			]
		}),
		new User({
			uNum: '20130004',
			uName: 'AHN DONGSIC',
			password: hash("1234"),
			lectureList: [
				310032,320375,110101,110102
			]
		}),
		new User({
			uNum: '20130005',
			uName: 'SEO JAESIC',
			password: hash("1234"),
			lectureList: [
				310032,320375,110101,110102
			]
		}),
		new User({
			uNum: 't111111',
			uName: 'PARK JOONSEOK',
			password: hash("1111"),
			is_teacher: true,
			lectureList: [
				320375
			]
		}),
		new User({
			uNum: 't111112',
			uName: 'KIM DONGHYUN',
			password: hash("1111"),
			is_teacher: true,
			lectureList: [
				310032
			]
		}),
		new User({
			uNum: 't111113',
			uName: 'MOON MIKYEONG',
			password: hash("1111"),
			is_teacher: true,
			lectureList: [
				1101027
			]
		}),
		new User({
			uNum: 't111114',
			uName: 'JO DAESOO',
			password: hash("1111"),
			is_teacher: true,
			lectureList: [
				110101
			]
		})
	];

	let lectureList = [
		new Lecture({
			lNum: 310032,
			lName: 'Capstone Design 1',
			lTeacher: 'KIM DONGHYUN'
		}),
		new Lecture({
			lNum: 320375,
			lName: 'Software Design Pattern',
			lTeacher: 'PARK JOONSEOK'
		}),
		new Lecture({
			lNum: 110101,
			lName: 'DataBase Design',
			lTeacher: 'JO DAESOO'
		}),
		new Lecture({
			lNum: 110102,
			lName: 'Software Engineering',
			lTeacher: 'MOON MIKEONG',
		})
	];

	let boardList = [
		new Board({
			lNum: 320375,
			bNum: 1,
			bName: "board1",
			createDate: '2018-5-11',
			updateDate: '2018-5-18',
		}),
	];

	Promise.all([
		User.remove({}).exec(),
		Lecture.remove({}).exec(),
		Board.remove({}).exec(),
		BoardContent.remove({}).exec(),
		SubmitContent.remove({}).exec(),
		Memo.remove({}).exec(),
	])
	.then( (result) => {
		return Promise.all([
			User.insertMany(userList),
			Lecture.insertMany(lectureList),
			Board.insertMany(boardList),
		]);
	})
	.then(res.status(200).json)
	.catch( (err) => {
		console.log(err);
		res.status(500).json(err);
	});

});

route.get('/koko', (req, res) => {
	res.status(200).json(moment.tz(new Date(),'Asia/Seoul').format("YYYY-MM-DD"));
});

export default route;
