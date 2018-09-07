import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

import * as service from 'service';

//Define Action
const SUBMITCONTENT_SET_STATUS_LOADING = 'submitcontent/set_status_loading';
const SUBMITCONTENT_SET_STATUS_SUCCESS = 'submitcontent/set_status_success';
const SUBMITCONTENT_SET_STATUS_FAILURE = 'submitcontent/set_status_failure';

const SUBMITCONTENT_SET_SUBMITLIST_DATA = 'submitcontent/set_submitlist_data';
const SUBMITCONTENT_CREATE_SUBMITLIST = 'submitcontent/create_submitlist';

const SUBMITCONTENT_SELECT_SUBMIT = 'submitcontent/select_submit';
const SUBMITCONTENT_SELECT_SUBMITCONTENT = 'submitcontent/select_submitcontent';

const SUBMITCONTENT_SET_SUBMITLIST_CONTENT = 'submitcontent_set_submitlist_content';
const SUBMITCONTENT_PUSH_SUBMITLIST_CONTENT = 'submitcontent_push_submitlist_content';


//Create Action

export const setStatusLoading = createAction(SUBMITCONTENT_SET_STATUS_LOADING);
export const setStatusSuccess = createAction(SUBMITCONTENT_SET_STATUS_SUCCESS);
export const setStatusFailure = createAction(SUBMITCONTENT_SET_STATUS_FAILURE);

export const setSubmitListData = createAction(SUBMITCONTENT_SET_SUBMITLIST_DATA);
export const createNewSubmit = createAction(SUBMITCONTENT_CREATE_SUBMITLIST);

export const selectSubmit = createAction(SUBMITCONTENT_SELECT_SUBMIT);
export const selectSubmitContent = createAction(SUBMITCONTENT_SELECT_SUBMITCONTENT);

export const setSubmitListContent = createAction(SUBMITCONTENT_SET_SUBMITLIST_CONTENT);
export const pushSubmitListContent = createAction(SUBMITCONTENT_PUSH_SUBMITLIST_CONTENT);

const initialState = Map({
	status: "INIT",
	selectedSubmitContent: 0,
	selectedIndex: 0,
	submitList: [],
});

export default handleActions({

	[SUBMITCONTENT_SET_STATUS_LOADING]: (state, action) => {
		return state.set('status', 'LOADING');
	},

	[SUBMITCONTENT_SET_STATUS_SUCCESS]: (state, action) => {
		return state.set('status', 'SUCCESS');
	},

	[SUBMITCONTENT_SET_STATUS_FAILURE]: (state, action) => {
		return state.set('status', 'FAILURE');
	},

	[SUBMITCONTENT_SET_SUBMITLIST_DATA]: (state, action) => {
		return state.set('submitList', action.payload);
	},

	[SUBMITCONTENT_CREATE_SUBMITLIST]: (state, action) => {
		let submitList = state.get('submitList').slice(0);
		submitList.push(action.payload);
		return state.set('submitList', submitList);
	},

	[SUBMITCONTENT_SELECT_SUBMIT]: (state, action) => {
		return state.set('selectedIndex', action.payload);
	},

	[SUBMITCONTENT_SELECT_SUBMITCONTENT]: (state, action) => {
		return state.set('selectedSubmitContent', action.payload);
	},

	[SUBMITCONTENT_SET_SUBMITLIST_CONTENT]: (state, action) => {
		let submitList = state.get('submitList').slice(0);
		let selectedIndex = state.get('selectedIndex');
		submitList[selectedIndex].contents = action.payload;

		return state.set('submitList', submitList);
	},

	[SUBMITCONTENT_PUSH_SUBMITLIST_CONTENT]: (state, action) => {
		let submitList = state.get('submitList').slice(0);
		let data = action.payload;
		let sNum = data.sNum;
		delete data.sNum;

		let needToPush = true;

		for(let i = 0; i < submitList[sNum-1].contents.length; i++ ) {
			if( submitList[sNum-1].contents[i].uName == data.uName ) {
				submitList[sNum-1].contents[i].data = data.data;
				needToPush = false;
				break;
			}
		}
		
		if( needToPush ) submitList[sNum-1].contents.push(data);
		console.log(submitList[sNum-1]);

		return state.set('submitList', submitList);
	},

}, initialState);
					
