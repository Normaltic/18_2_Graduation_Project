import model_Memo from './routes/models/memoModel';
import model_BoardContent from './routes/models/boardContentModel';
import model_SubmitContent from './routes/models/submitContentModel';

export default (io) => (socket) => {
	console.log("connected");
	
	socket.on('initializeUserInfo', (data) => {
		socket.join(data.b_id);
		socket.nowJoined = data.b_id;
		if( data.is_teacher ) {
			model_BoardContent.findOrCreate(data.b_id)
			.then( (result) => {
				return Promise.all([
					Promise.resolve(result),
					model_SubmitContent.findAllContent(data.b_id, result.submitList),
				]);
			})
			.then( ( resultArray ) => {
				io[data.b_id] = resultArray[0];
				io.to(socket.id).emit('initializeBoardData', {
					boardData: resultArray[0],
					submitData: resultArray[1],
				});
			})
			.catch( (err) => {
				console.log(err);
			});

			return;
		}
		
		const define = () => {
			if( io[data.b_id] != undefined ) return Promise.resolve(io[data.b_id]);
			return model_BoardContent.findOrCreate(data.b_id);
		};

		define()
		.then( (result) => {
			return Promise.all([
				Promise.resolve(result),
				model_SubmitContent.findUserContent(data.b_id, data.uNum, result.submitList),
				model_Memo.findOrCreate(data.b_id, data.uNum),
			]);
		})
		.then( ( resultArray ) => {
			io.to(socket.id).emit('initializeBoardData', {
				boardData: resultArray[0],
				submitData: resultArray[1],
				memoData: resultArray[2],
			});
		})
		.catch( (err) => {
			console.log(err);
		});

		return;
	})
	
	socket.on('drawingTeachDown', (data) => {
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachDown', data);
	})

	socket.on('drawingTeachMove', (data) => {
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachMove', data);
	})

	socket.on('drawingTeachUp', (data) => {
		let itemData = Object.assign({}, data.itemData);
		io[socket.nowJoined].itemList[data.pageIndex].items.push(itemData);
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachUp', data);
	});

	socket.on('drawingTeachUndo', (data) => {
		io[socket.nowJoined].itemList[data].items.pop();
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachUndo', data);
	});

	socket.on('drawingTeachRedo', (data) => {
		let itemData = Object.assign({}, data.itemData);
		io[socket.nowJoined].itemList[data.pageIndex].items.push(itemData);
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachRedo', data);
	});

	socket.on('teachCreateNewPage', (data) => {
		let pageStructure = {
			pageIndex: io[socket.nowJoined].itemList.length,
			items: [],
		}
		io[socket.nowJoined].itemList.push(pageStructure);
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachCreatePage', {});
	});

	socket.on('teachCreateNewSubmit', (data) => {
		io[socket.nowJoined].submitList.push(data);
		socket.broadcast.to(`${socket.nowJoined}`).emit('broadcastTeachCreateSubmit', data);
	});

	socket.on('studentSubmitContent', (data) => {
		model_SubmitContent.UpdateOrCreate(socket.nowJoined, data)
		.then( (resultData) => {
			socket.broadcast.to(`${socket.nowJoined}`).emit('recieveStudentSubmit', data);
		});
	});

	socket.on('exitStudent', (data) => {
		model_Memo.updateContents(socket.nowJoined, data.uNum, data.itemList)
		.then(console.log)
		.catch(console.err);
	});

	socket.on('exitTeacher', (data) => {
		let boardData = io[socket.nowJoined];
		io[socket.nowJoined] = undefined;
		model_BoardContent.updateContents(socket.nowJoined, boardData)
		.then(console.log)
		.catch(console.err);
	});
};	
