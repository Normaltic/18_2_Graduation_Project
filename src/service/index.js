import lib_axios from 'axios';

const rootURL = 'http://mango-tree.xyz:4848/api';
const AUTH = '/auth/';
const LECTURE = '/secret/lecture/';
const BOARD = '/secret/board/';
const PAINTWORK = '/secret/paintwork/';
const SUBMIT = '/secret/submit/';


/*
 * Auth
*/
export const SignIn = (id, pw) => {
	return lib_axios.post( rootURL + AUTH, {
		id: id,
		pw: pw
	});
};

export const initializeToken = (token) => {
	if( token !== undefined ) lib_axios.defaults.headers['pansor-token'] = token;
	else delete lib_axios.defaults.headers['pansor-token'];
}

/*
 * Lecture
*/
export const getLectureList = () => {
	return lib_axios.get( rootURL + LECTURE );
}

/*
 * Board
*/
export const getBoardList = (lNum) => {
	return lib_axios.get( rootURL + BOARD + lNum );
}

export const createNewBoard = (lNum, bName) => {
	return lib_axios.post( rootURL + BOARD + lNum, {
		bName
	});
}

