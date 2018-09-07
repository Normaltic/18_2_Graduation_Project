import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

import toolValue from 'tools';
import Pencil from 'tools/Pencil';
import Eraser from 'tools/Eraser';
import Rect from 'tools/Rect';
import Circle from 'tools/Circle';

//Define Action

const BOARDCONTENT_SET_STATUS_LOADING = 'boardcontent/set_status_loading';
const BOARDCONTENT_SET_STATUS_SUCCESS = 'boardcontent/set_status_success';
const BOARDCONTENT_SET_STATUS_FAILURE = 'boardcontent/set_status_failure';

const BOARDCONTENT_SET_PAGEDATA_DATA = 'boardcontent/set_pagedata_data';
const BOARDCONTENT_SELECT_PAGE = 'boardcontent/select_page';
const BOARDCONTENT_CREATE_PAGE = 'boardcontent/create_page';

const BOARDCONTENT_PUSH_MYITEM = 'boardcontent/push_myitem';
const BOARDCONTENT_UNDO_MYITEM = 'boardcontent/undo_myitem';
const BOARDCONTENT_REDO_MYITEM = 'boardcontent/redo_myitem';

const BOARDCONTENT_SET_MYPREVIEW = 'boardcontent/set_mypreview';

const BOARDCONTENT_PUSH_TEACHITEM = 'boardcontent/push_teachitem';
const BOARDCONTENT_UNDO_TEACHITEM = 'boardcontent/undo_teachitem';
const BOARDCONTENT_REDO_TEACHITEM = 'boardcontent/redo_teachitem';

const BOARDCONTENT_SET_TEACHPREVIEW = 'boardcontent/set_teachpreview';

const BOARDCONTENT_PUSH_NEWPAGE = 'boardcontent/push_newpage';

//Create Action

export const setStatusLoading = createAction(BOARDCONTENT_SET_STATUS_LOADING);
export const setStatusSuccess = createAction(BOARDCONTENT_SET_STATUS_SUCCESS);
export const setStatusFailure = createAction(BOARDCONTENT_SET_STATUS_FAILURE);

export const setPageData = createAction(BOARDCONTENT_SET_PAGEDATA_DATA); // allData
export const selectPage = createAction(BOARDCONTENT_SELECT_PAGE); // pageIndex
export const createPage = createAction(BOARDCONTENT_CREATE_PAGE);

export const pushMyItem = createAction(BOARDCONTENT_PUSH_MYITEM); // pageIndex, itemData
export const undoMyItem = createAction(BOARDCONTENT_UNDO_MYITEM); 
export const redoMyItem = createAction(BOARDCONTENT_REDO_MYITEM);

export const setMyPreview = createAction(BOARDCONTENT_SET_MYPREVIEW); // pageIndex, previewData

export const pushTeachItem = createAction(BOARDCONTENT_PUSH_TEACHITEM); // pageIndex, itemData
export const undoTeachItem = createAction(BOARDCONTENT_UNDO_TEACHITEM);
export const redoTeachItem = createAction(BOARDCONTENT_REDO_TEACHITEM);

export const setTeachPreview = createAction(BOARDCONTENT_SET_TEACHPREVIEW); // pageIndex, previewData

//Supporting Action Method

const getPageStructure = (pageIndex) => {

	return {
		pageIndex: pageIndex,
		items: {
			myItemList: [],
			undoList: [],
			teachItemList: [],
		},
		previews: {
			myPreview: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAPklEQVRIS+3TsQ0AMAgEMdh/afr0D0XMACBZR9fR9NHdcnhNHjXqmIC4YrTvYtSoYwLiitH6Y3GJKybwX1wD6fcAH1bniBkAAAAASUVORK5CYII="],
			teachPreview: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAPklEQVRIS+3TsQ0AMAgEMdh/afr0D0XMACBZR9fR9NHdcnhNHjXqmIC4YrTvYtSoYwLiitH6Y3GJKybwX1wD6fcAH1bniBkAAAAASUVORK5CYII="],
		}
	}
}

//Define InitialState

const initialState = Map({
	status: "INIT",
	selectedPage: 0,
	pageData: [getPageStructure(0)],
});


//thunk Action

export const setInitializeBoardContentStore = (material) => (dispatch) => {
	
	dispatch(setStatusLoading());

	let { boardData, memoData } = material;

	let previewCanvas = document.createElement('canvas');
	previewCanvas.width = 1920;
	previewCanvas.height = 1080;
	let previewCanvasContext = previewCanvas.getContext('2d');
	
	let toolBox = {
		[toolValue.type.TOOL_PENCIL]: Pencil(previewCanvasContext),
		[toolValue.type.TOOL_ERASER]: Eraser(previewCanvasContext),
		[toolValue.type.TOOL_RECT]: Rect(previewCanvasContext),
		[toolValue.type.TOOL_CIRCLE]: Circle(previewCanvasContext),
	}

	let pageData = [];

	let getDrawingItemsImageData = (items) => {
		items.forEach( (item, i) => toolBox[item.tool].reDrawWithData(item) );
		let imageData = previewCanvas.toDataURL();
		previewCanvas.width = 1920;
		return imageData;
	}

	for( let i = 0; i < boardData.itemList.length; i++ ) {
		let onePageData = getPageStructure(i);
		let boardImageData = getDrawingItemsImageData(boardData.itemList[i].items);
		if( memoData ) {
			let memoItem = memoData.itemList[i] && memoData.itemList[i].pageIndex == i ? memoData.itemList[i].items : [];
			onePageData.items.myItemList = memoItem;
			onePageData.items.teachItemList = boardData.itemList[i].items;
			onePageData.previews.myPreview[0] = getDrawingItemsImageData(memoItem);
			onePageData.previews.teachPreview[0] = boardImageData;
		} else {
			onePageData.items.myItemList = boardData.itemList[i].items;
			onePageData.previews.myPreview[0] = boardImageData;
		}
		pageData.push(onePageData);
	}

	dispatch(setPageData(pageData));
	dispatch(setStatusSuccess());	
}
//

export default handleActions({

	[BOARDCONTENT_SET_STATUS_LOADING]: (state, action) => {
		return state.set('status', 'LOADING');
	},

	[BOARDCONTENT_SET_STATUS_SUCCESS]: (state, action) => {
		return state.set('status', 'SUCCESS');
	},

	[BOARDCONTENT_SET_STATUS_FAILURE]: (state, action) => {
		return state.set('status', 'FAILURE');
	},

	[BOARDCONTENT_SET_PAGEDATA_DATA]: (state, action) => {
		return state.set('pageData', action.payload);		
	},

	[BOARDCONTENT_SELECT_PAGE]: (state, action) => {
		return state.set('selectedPage', action.payload);
	},

	[BOARDCONTENT_CREATE_PAGE]: (state, action) => {
		let pageData = state.get('pageData');
		let newPageData = getPageStructure(pageData.length);
		pageData.push(newPageData);
		return state.set('pageData', pageData.slice(0));
	},

	[BOARDCONTENT_PUSH_MYITEM]: (state, action) => {
		let selectedPage = state.get('selectedPage');
		let pageData = state.get('pageData');
		pageData[selectedPage].items.myItemList.push(action.payload);
	 	
		return state.set('pageData', pageData.slice(0));
	},

	[BOARDCONTENT_UNDO_MYITEM]: (state, action) => {
		let pageIndex = state.get('selectedPage');
		let pageData = state.get('pageData');
		if( pageData[pageIndex].items.myItemList.length ) {
			let itemData = pageData[pageIndex].items.myItemList.pop();
			pageData[pageIndex].items.undoList.push(itemData);
			action.payload(pageIndex);
		}

		return state.set('pageData', pageData.slice(0));
	},

	[BOARDCONTENT_REDO_MYITEM]: (state, action) => {
		let pageIndex = state.get('selectedPage');
		let pageData = state.get('pageData');
		if( pageData[pageIndex].items.undoList.length ) {
			let itemData = pageData[pageIndex].items.undoList.pop();
			pageData[pageIndex].items.myItemList.push(itemData);
			action.payload(pageIndex, itemData);
		};

		return state.set('pageData', pageData.slice(0));
	},

	[BOARDCONTENT_SET_MYPREVIEW]: (state, action) => {
		let { pageIndex, imageData } = action.payload;
		let pageData = state.get('pageData').slice(0);

		pageData[pageIndex].previews.myPreview = [imageData];

		return state.set('pageData', pageData);
	},

	[BOARDCONTENT_PUSH_TEACHITEM]: (state, action) => {
		let pageData = state.get('pageData');
		pageData[action.payload.pageIndex].items.teachItemList.push(action.payload.itemData);
	 	
		return state.set('pageData', pageData.slice(0) );
	},

	[BOARDCONTENT_UNDO_TEACHITEM]: (state, action) => {
		let pageIndex = action.payload;
		let pageData = state.get('pageData');

		pageData[pageIndex].items.teachItemList.pop();

		return state.set('pageData', pageData.slice(0));
	},

	[BOARDCONTENT_SET_TEACHPREVIEW]: (state,action) => {
		let { pageIndex, imageData } = action.payload;
		let pageData = state.get('pageData');

		pageData[pageIndex].previews.teachPreview = [imageData];

		return state.set('pageData', pageData.slice(0));
	},

}, initialState);
					
