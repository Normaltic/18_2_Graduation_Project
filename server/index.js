import lib_express from 'express';
import lib_bodyParser from 'body-parser';
import lib_morgan from 'morgan';
import lib_path from 'path';
import lib_mongoose from 'mongoose';
import lib_socket from 'socket.io';

import socketHandler from './socketHandler';
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

io.on('connection', socketHandler(io));	
