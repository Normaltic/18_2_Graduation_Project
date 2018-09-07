import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

import * as service from 'service';

import * as lectureAction from './Lecture';

//Define Action
const AUTH_SET_STATUS_LOADING = 'auth/set_status_loading';
const AUTH_SET_STATUS_SUCCESS = 'auth/set_status_success';
const AUTH_SET_STATUS_FAILURE = 'auth/set_status_failure';

const AUTH_SET_AUTH_DATA = 'auth/set_auth_data';
const AUTH_SET_AUTH_INITIALIZE = 'auth/set_auth_initialize';

//Create Action

export const setStatusLoading = createAction(AUTH_SET_STATUS_LOADING);
export const setStatusSuccess = createAction(AUTH_SET_STATUS_SUCCESS);
export const setStatusFailure = createAction(AUTH_SET_STATUS_FAILURE);

export const setAuthData = createAction(AUTH_SET_AUTH_DATA); // uName, is_teacher
export const setAuthInitialize = createAction(AUTH_SET_AUTH_INITIALIZE);

const initialState = Map({
	status: "INIT",
	uNum: 0,
	uName: "",
	is_teacher: false,
});

export const SignIn = (id, pw) => dispatch => {

	dispatch(setStatusLoading());

	return service.SignIn(id, pw)
	.then( (response) => {
		let data = response.data;
		service.initializeToken(data.token);
		dispatch(setAuthData(data.userInfo));
		dispatch(lectureAction.setLectureListData(data.lectureList));
		dispatch(setStatusSuccess());
		return Promise.resolve();
	})
	.catch( (err) => {
		console.log(err);
		dispatch(setStatusFailure());
		return Promise.reject(err);
	});
};

export const SignOut = () => dispatch => {

	dispatch(setStatusLoading());

	try {
		dispatch(lectureAction.setSelectedInitialize());
		dispatch(lectureAction.setLectureListInitialize());
		dispatch(setAuthInitialize());
		service.initializeToken();
		//do something

	} catch(e) {
		dispatch(setStatusFailure());
		console.log(e);
		
	}	
}



export default handleActions({

	[AUTH_SET_STATUS_LOADING]: (state, action) => {
		return state.set('status', 'LOADING');
	},

	[AUTH_SET_STATUS_SUCCESS]: (state, action) => {
		return state.set('status', 'SUCCESS');
	},

	[AUTH_SET_STATUS_FAILURE]: (state, action) => {
		return state.set('status', 'FAILURE');
	},

	[AUTH_SET_AUTH_DATA]: (state, action) => {
		return state.set('uNum', action.payload.uNum)
					.set('uName', action.payload.uName)
					.set('is_teacher', action.payload.is_teacher);
	},

	[AUTH_SET_AUTH_INITIALIZE]: (state, action) => {
		return state.set('status', initialState.get('status'))
					.set('uName', initialState.get('uName'))
					.set('is_teacher', initialState.get('is_teacher'));
	},

}, initialState);
					
