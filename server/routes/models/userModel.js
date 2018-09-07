import lib_mongoose from 'mongoose';
import lib_bcrypt from 'bcryptjs';

const Schema = lib_mongoose.Schema;

const User = new Schema({
	uNum: String,
	uName: String,
	password: String,
	is_teacher: { type: Boolean, default: false },
	lectureList: { type: [Number], default: [] }
});

User.statics.findByNumber = function(uNum) {
	return this.findOne(
		{
			uNum: uNum
		},
		{
			_id: false,
			__v: false,
		}
	).exec();
}

User.methods.generateHash = function() {
	return lib_bcrypt.hashSync(this.password, 10);
}

User.methods.checkHash = function(pw) {
	return lib_bcrypt.compareSync(pw, this.password);
}

export default lib_mongoose.model('user', User);
