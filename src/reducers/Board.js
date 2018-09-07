import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as service from 'service';

//Define Action

const BOARD_SET_STATUS_LOADING = 'board/set_status_loading';
const BOARD_SET_STATUS_SUCCESS = 'board/set_status_success';
const BOARD_SET_STATUS_FAILURE = 'board/set_status_failure';

const BOARD_SET_BOARDLIST_DATA = 'board/set_boardlist_data';
const BOARD_ADD_BOARDLIST_ITEM = 'board/add_boardlist_item';

//Create Action
export const setStatusLoading = createAction(BOARD_SET_STATUS_LOADING);
export const setStatusSuccess = createAction(BOARD_SET_STATUS_SUCCESS);
export const setStatusFailure = createAction(BOARD_SET_STATUS_FAILURE);

export const setBoardListData = createAction(BOARD_SET_BOARDLIST_DATA);
export const addBoardListItem = createAction(BOARD_ADD_BOARDLIST_ITEM);

export const setBoardList = (lNum) => dispatch => {

	dispatch(setStatusLoading());

	return service.getBoardList(lNum)
	.then( (response) => {
		dispatch(setBoardListData(response.data));
		dispatch(setStatusSuccess());
		
		return Promise.resolve();
	})
	.catch( (err) => {
		dispatch(setStatusFailure());
		console.log(err);

		return Promise.reject();
	});
};

export const createNewBoard = (lNum, bName) => dispatch => {

	dispatch(setStatusLoading());
	
	return service.createNewBoard(lNum, bName)
	.then( (response) => {
		dispatch(addBoardListItem(response.data));
		dispatch(setStatusSuccess());

		return Promise.resolve();
	})
	.catch( (err) => {
		dispatch(setStatusFailure());
		console.log(err);

		return Promise.reject();
	});
};

const initialState = Map({
	status: "INIT",
	boardList: [],
});

export default handleActions({

	[BOARD_SET_STATUS_LOADING]: (state, action) => {
		return state.set('status', 'LOADING');
	},

	[BOARD_SET_STATUS_SUCCESS]: (state, action) => {
		return state.set('status', 'SUCCESS');
	},

	[BOARD_SET_STATUS_FAILURE]: (state, action) => {
		return state.set('status', 'FAILURE');
	},

	[BOARD_SET_BOARDLIST_DATA]: (state, action) => {
		return state.set('boardList', action.payload);
	},

	[BOARD_ADD_BOARDLIST_ITEM]: (state, action) => {

		return state.set('boardList', [...state.get('boardList'), action.payload]);
	},

}, initialState);
					
