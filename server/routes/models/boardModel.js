import lib_mongoose from 'mongoose';

const Schema = lib_mongoose.Schema;

const Board = new Schema({
	lNum: Number,
	bNum: Number,
	bName: String,
	createDate: String,
	updateDate: String,
});

Board.statics.findBoardList = function(lNum) {
	return this.find({
			lNum: lNum
	}).sort({
		bNum: 1
	});
}

export default lib_mongoose.model('board', Board);
