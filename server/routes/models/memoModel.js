import lib_mongoose from 'mongoose';

const Schema = lib_mongoose.Schema;

const Memo = new Schema({
	b_id: Schema.Types.ObjectId,
	uNum: Number,
	itemList: { type: Array, default: [] },
});

Memo.statics.findOrCreate = function(b_id, uNum) {
	return this.findOne({
		b_id: b_id,
		uNum: uNum,
	})
	.then( (result) => {
		if( result ) return Promise.resolve(result);
		return new this({
			b_id: b_id,
			uNum: uNum,
			itemList: [{
				pageIndex: 0,
				items: []
			}],
		}).save();
	})
	.catch( (err) => {
		return Promise.reject(err);
	});
};

Memo.statics.updateContents = function(b_id, uNum, list) {
	return this.findOne({
		b_id: b_id,
		uNum: uNum,
	})
	.then( (result) => {
		if( !result ) return Promise.reject("NO_DATA");
		result.itemList = list;
		return result.save();
	})
	.catch( (err) => {
		return Promise.reject(err)
	});
}

export default lib_mongoose.model('memo', Memo);
