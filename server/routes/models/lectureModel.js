import lib_mongoose from 'mongoose';

const Schema = lib_mongoose.Schema;

const Lecture = new Schema({
	lNum: Number,
	lName: String,
	lTeacher: String,
});

Lecture.statics.findLectureList = function(lectureList) {
	return this.find(
		{
			lNum: { $in: lectureList }
		},
		{
			_id: false,
			__v: false,
		}
	).exec();
}

export default lib_mongoose.model('lecture', Lecture);
