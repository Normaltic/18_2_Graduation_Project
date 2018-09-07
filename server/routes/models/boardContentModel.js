import lib_mongoose from 'mongoose';

const Schema = lib_mongoose.Schema;

const BoardContent = new Schema({
	b_id: Schema.Types.ObjectId,
	submitList: { type: Array, default: [] },
	itemList: { type: Array, default: [] },
});

BoardContent.statics.findOrCreate = function(b_id) {
	return this.findOne({
		b_id: b_id
	})
	.then( (result) => {
		if( result ) return Promise.resolve(result);
		return new this({
			b_id: b_id,
			itemList: [{
				pageIndex: 0,
				items: [],
			}]
		}).save();
	})
	.catch( (err) => {
		return Promise.reject(err);
	});
};

BoardContent.statics.updateContents = function(b_id, boardData) {
	return this.findOne({
		b_id: b_id
	})
	.then( (result) => {
		if( !result ) return Promise.reject("NODATA");
		result.submitList = boardData.submitList;
		result.itemList = boardData.itemList;
		return result.save();
	})
	.catch( (err) => {
		return Promise.reject(err);
	});
}


export default lib_mongoose.model('boardcontent', BoardContent);
