import lib_jwt from 'jsonwebtoken';

export default (req, res, next) => {
	new Promise( (resolve, reject) => {

		const token = req.headers['pansor-token'];

		if( !token ) reject( { err: "DONT HAVE TOKEN", code: 400 } );
		
		lib_jwt.verify( token, req.app.get('jwt-secret'), (err, decoded) => {
			if( err ) reject( { err: "INVALID TOKEN", code: 401 } );
			resolve(decoded);
		});
	})
	.then( (decoded) => {
		req.decoded = decoded;
		next();
	})
	.catch( ({err, code = 500}) => {
		console.log(err);
		return res.status(code).json({
			error: err
		});
	});
};
