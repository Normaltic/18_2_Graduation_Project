import lib_express from 'express';
import lib_moment from 'moment-timezone';

import Board from './models/boardModel';

const route = lib_express.Router();

const getNowDate = () => {
	return lib_moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DD");
};

route.get('/:lNum', (req, res) => {

	let { lNum } = req.params;

	if( !lNum ) return res.status(400).json({
		message: "INVALID LNUM"
	});

	Board.findBoardList(lNum)
	.then( (result) => {
		res.status(200).json(result)
	})
	.catch( (err) => {
		res.status(500).json({
			error: err
		});
	});
});

route.post('/:lNum', (req, res) => {

	let { lNum } = req.params;
	let { bName } = req.body;
	if( !req.decoded.is_teacher ) return res.status(401).json({
		error: "PERMISSION DENIED"
	});

	if( !bName ) return res.status(400).json({
		error: "INVALID BOARD NAME"
	});

	if( !lNum ) return res.status(400).json({
		error: "INVALID LECTURE NUMBER"
	});
	
	Board.find({
		lNum: lNum
	})
	.then( (boardList) => {
		let date = getNowDate();

	console.log("here");
		return new Board({
			lNum: lNum,
			bNum: boardList.length + 1,
			bName: bName,
			createDate: date,
			updateDate: date
		})
		.save();
	})
	.then( (result) => {
	console.log("here");
		res.status(200).json(result);
	})
	.catch( (err) => {
		console.log(err);
		res.status(400).json(err);
	});
});

export default route;
