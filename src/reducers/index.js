import { combineReducers } from 'redux';

import Auth from './Auth';
import Lecture from './Lecture';
import Board from './Board';
import Tools from './Tools';
import BoardContent from './BoardContent';
import SubmitContent from './SubmitContent';

export default combineReducers({
	Auth,
	Lecture,
	Board,
	Tools,
	BoardContent,
	SubmitContent,
});
