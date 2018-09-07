import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

import toolValue from 'tools';


//Define Action

const TOOL_SET_USETOOL_PENCIL = 'tools/set_usetool_pencil';
const TOOL_SET_USETOOL_ERASER = 'tools/set_usetool_eraser';
const TOOL_SET_USETOOL_RECT = 'tools/set_usetool_rect';
const TOOL_SET_USETOOL_CIRCLE = 'tools/set_usetool_circle';
const TOOL_SET_USETOOL_MOVE = 'tools/set_usetool_move';

const TOOL_SET_TOOLOPTION_COLOR = 'tools/set_tooloption_color';
const TOOL_SET_TOOLOPTION_SIZE = 'tools/set_tooloption_size';

const TOOL_SET_WORK_UNDO = 'tools/set_work_undo';
const TOOL_SET_WORK_REDO = 'tools/set_work_redo';

//Create Action

export const setUseToolPencil = createAction(TOOL_SET_USETOOL_PENCIL);
export const setUseToolEraser = createAction(TOOL_SET_USETOOL_ERASER);
export const setUseToolRect = createAction(TOOL_SET_USETOOL_RECT);
export const setUseToolCircle = createAction(TOOL_SET_USETOOL_CIRCLE);
export const setUseToolMove = createAction(TOOL_SET_USETOOL_MOVE);

export const setToolColor = createAction(TOOL_SET_TOOLOPTION_COLOR); // color
export const setToolSize = createAction(TOOL_SET_TOOLOPTION_SIZE); // size

export const setUndoWork = createAction(TOOL_SET_WORK_UNDO);
export const setRedoWork = createAction(TOOL_SET_WORK_REDO);

const initialState = Map({
	useTool: toolValue.type.TOOL_MOVE,
	toolOption: {
		[toolValue.type.TOOL_PENCIL]: {
			size: toolValue.size.SIZE_B,
			color: toolValue.color.BLACK,
		},
		[toolValue.type.TOOL_ERASER]: {
			size: toolValue.size.SIZE_D,
			color: null,
		},
		[toolValue.type.TOOL_RECT]: {
			size: toolValue.size.SIZE_B,
			color: toolValue.color.BLACK,
		},
		[toolValue.type.TOOL_CIRCLE]: {
			size: toolValue.size.SIZE_B,
			color: toolValue.color.BLACK,
		},
		[toolValue.type.TOOL_MOVE]: {
			size: null,
			color: null,
		},
	},
	undoWork: () => {},
	redoWork: () => {},
});

export default handleActions({
	[TOOL_SET_USETOOL_PENCIL]: (state, action) => {
		return state.set('useTool', toolValue.type.TOOL_PENCIL);
	},
	
	[TOOL_SET_USETOOL_ERASER]: (state, action) => {
		return state.set('useTool', toolValue.type.TOOL_ERASER);
	},

	[TOOL_SET_USETOOL_RECT]: (state, action) => {
		return state.set('useTool', toolValue.type.TOOL_RECT);
	},

	[TOOL_SET_USETOOL_CIRCLE]: (state, action) => {
		return state.set('useTool', toolValue.type.TOOL_CIRCLE);
	},

	[TOOL_SET_USETOOL_MOVE]: (state, action) => {
		return state.set('useTool', toolValue.type.TOOL_MOVE);
	},

	[TOOL_SET_TOOLOPTION_COLOR]: (state, action) => {
		let useTool = state.get('useTool');
		let nextOptionState = Object.assign({}, state.get('toolOption'));

		if( useTool === toolValue.type.TOOL_ERASER || useTool === toolValue.type.TOOL_MOVE )
			return state.set('toolOption', nextOptionState);
		
		let color = action.payload;
		nextOptionState[useTool].color = color;

		return state.set('toolOption', nextOptionState);
	},

	[TOOL_SET_TOOLOPTION_SIZE]: (state, action) => {
		let useTool = state.get('useTool');
		let nextOptionState = Object.assign({}, state.get('toolOption'));

		if( useTool === toolValue.type.TOOL_MOVE )
			return state.set('toolOption', nextOptionState);

		let size = action.payload;
		nextOptionState[state.get('useTool')].size = size;

		return state.set('toolOption', nextOptionState);
	},

	[TOOL_SET_WORK_UNDO]: (state, action) => {

		return state.set('undoWork', action.payload);
	},

	[TOOL_SET_WORK_REDO]: (state, action) => {
		
		return state.set('redoWork', action.payload);
	},

}, initialState);
