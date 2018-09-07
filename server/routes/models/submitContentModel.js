import lib_mongoose from 'mongoose';

const Schema = lib_mongoose.Schema;

const SubmitContent = new Schema({
	b_id: Schema.Types.ObjectId,
	uNum: Number,
	uName: String,
	sNum: Number,
	data: { type: Array, default: [] },
});

SubmitContent.statics.findAllContent = function(b_id, submitList) {
	if( submitList == [] ) return Promise(submitList);
	console.log("dispatch findAllContent Method");
	console.log(submitList);
	return this.find(
		{ b_id: b_id },
		{ _id : 0, b_id: 0, }
	).sort({
		sNum: 1
	})
	.then( (resultArray) => {
		let list = submitList.map( (item, i) => {
			item.contents = [];
			return item;
		});
		console.log("mapping to list");
		console.log(list);
		for( let submitContent of resultArray ) list[submitContent.sNum-1].contents.push(submitContent);
		return Promise.resolve(list);
	})
	.catch( (err) => {
		return Promise.reject(err);
	});
}

SubmitContent.statics.findUserContent = function(b_id, uNum, submitList) {
	if( submitList == [] ) return Promise(submitList);
	return this.find(
		{ b_id: b_id, uNum: uNum },
		{ _id: 0, b_id: 0 }
	).sort({
		sNum: 1
	})
	.then( (resultArray) => {
		let list = submitList.map( (item, i) => {
			item.contents = [];
			return item;
		});
		for( let submitContent of resultArray ) list[submitContent.sNum-1].contents = submitContent.data;
		return Promise.resolve(list);
	})
	.catch( (err) => {
		return Promise.reject(err);
	});
}

SubmitContent.statics.UpdateOrCreate = function(b_id, data) {
	return this.findOne({ 
		b_id: b_id,
		uNum: data.uNum,
		sNum: data.sNum
	})
	.then( (result) => {
		if( !result ) {
			result = new this({
				b_id: b_id,
				uNum: data.uNum,
				uName: data.uName,
				sNum: data.sNum,
				data: data.data,
			});
		}
		else result.data = data.data;
		console.log("result");
		console.log(result);
		return result.save();
	})
	.then( (result) => { return Promise.resolve(result) } )
	.catch( (err) => {
		console.log(err);
		return Promise.reject(err);
	});
}

export default lib_mongoose.model('submitcontent', SubmitContent);
