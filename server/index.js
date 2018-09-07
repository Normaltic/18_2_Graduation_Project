import lib_express from 'express';
import lib_bodyParser from 'body-parser';
import lib_morgan from 'morgan';
import lib_path from 'path';
import lib_mongoose from 'mongoose';
import lib_socket from 'socket.io';

import model_Memo from './routes/models/memoModel';
import model_BoardContent from './routes/models/boardContentModel';
import model_SubmitContent from './routes/models/submitContentModel';

import router from './routes';

const port = process.env.PORT || 4847;
const dbURL = 'mongodb://localhost:27017/normaltic_board';

lib_mongoose.Promise = global.Promise;
lib_mongoose.connect(dbURL);

var server = lib_express();

server.use(lib_morgan('dev'));
server.use(lib_bodyParser.json());

server.set('jwt-secret', 'NormaltiC');

server.use('/api', router);

server.use('/',
	lib_express.static(lib_path.resolve( __dirname, '../public'))
);

server.use('*', (req, res, next) => {
	if( req.path.split('/')[1] == 'static' ) return next();
	res.sendFile(
		lib_path.resolve( __dirname, '../public/index.html' )
	);
});

const expressServer = server.listen( port, () => {
	console.log("Server is listening on port " + port );
});

if( process.env.NODE_ENV == 'development' ) {
	const lib_webpack = require('webpack');
	const lib_WebpackDevServer = require('webpack-dev-server');
	const lib_DevConfig = require('../webpack.dev.config');
	const compiler = lib_webpack(lib_DevConfig);
	const devServer = new lib_WebpackDevServer(compiler, lib_DevConfig.devServer);
	devServer.listen(lib_DevConfig.devServer.port);
};

const io = lib_socket(expressServer);

io.on('connection', (socket) => {
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
				console.log("---TeacherResultArray---");
				console.log(resultArray);
				console.log("------------------------");
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
			console.log("---StudentResultArray---");
			console.log(resultArray);
			console.log("------------------------");
			console.log(resultArray[0]);
			console.log("------------------------");
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
		console.log(io[socket.nowJoined].itemList[data].items.length);
		io[socket.nowJoined].itemList[data].items.pop();
		console.log(io[socket.nowJoined].itemList[data].items.length);
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
		console.log(io[socket.nowJoined].itemList.length);
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
		console.log(data);
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

	socket.on('asd', console.log);
})	
