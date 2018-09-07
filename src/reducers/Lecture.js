import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as service from 'service';

import * as boardAction from './Board';

//Define Action
const LECTURE_SET_STATUS_LOADING = 'lecture/set_status_loading';
const LECTURE_SET_STATUS_SUCCESS = 'lecture/set_status_success';
const LECTURE_SET_STATUS_FAILURE = 'lecture/set_status_failure';

const LECTURE_SET_LECTURELIST_DATA = 'lecture/set_lecturelist_data';
const LECTURE_SET_SELECTED_DATA = 'lecture/set_selected_data';

const LECTURE_SET_LECTURELIST_INITIALIZE = 'lecture/set_lecturelist_initialize';
const LECTURE_SET_SELECTED_INITIALIZE = 'lecture/set_selected_initialize';

//Create Action
export const setStatusLoading = createAction(LECTURE_SET_STATUS_LOADING);
export const setStatusSuccess = createAction(LECTURE_SET_STATUS_SUCCESS);
export const setStatusFailure = createAction(LECTURE_SET_STATUS_FAILURE);

export const setLectureListData = createAction(LECTURE_SET_LECTURELIST_DATA); // lectureList;
export const setSelectedData = createAction(LECTURE_SET_SELECTED_DATA); // lNum, listIndex;

export const setLectureListInitialize = createAction(LECTURE_SET_LECTURELIST_INITIALIZE);
export const setSelectedInitialize = createAction(LECTURE_SET_SELECTED_INITIALIZE);

const initialState = Map({
	status: "INIT",
	selected: {
		lNum: -1,
		listIndex: -1
	},
	lectureList: []
});

export const selectLecture = ({lNum, listIndex, history}) => dispatch => {

	dispatch(setStatusLoading());

	return boardAction.setBoardList(lNum)(dispatch)
	.then( (result) => {
		dispatch(setSelectedData({lNum, listIndex}));
		dispatch(setStatusSuccess());
		history.push(`/lectureList/${lNum}`);

		return Promise.resolve();
	})
	.catch( (err) => {
		dispatch(setStatusFailure());
		return Promise.reject(err);
	});
}


export default handleActions({

	[LECTURE_SET_STATUS_LOADING]: (state, action) => {
		return state.set('status', 'LOADING');
	},

	[LECTURE_SET_STATUS_SUCCESS]: (state, action) => {
		return state.set('status', 'SUCCESS');
	},

	[LECTURE_SET_STATUS_FAILURE]: (state, action) => {
		return state.set('status', 'FAILURE');
	},

	[LECTURE_SET_LECTURELIST_DATA]: (state, action) => {
		return state.set('lectureList', action.payload);
	},

	[LECTURE_SET_SELECTED_DATA]: (state, action) => {
		return state.set('selected', action.payload);
	},

	[LECTURE_SET_LECTURELIST_INITIALIZE]: (state, action) => {
		return state.set('lectureList', initialState.get('lectureList'));
	},

	[LECTURE_SET_SELECTED_INITIALIZE]: (state, action) => {
		return state.set('selected', initialState.get('selected'));
	},

}, initialState);
					
