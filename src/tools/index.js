import { TOOL_PENCIL } from './Pencil';
import { TOOL_ERASER } from './Eraser';
import { TOOL_RECT } from './Rect';
import { TOOL_CIRCLE } from './Circle';

export default {
	type: {
		TOOL_PENCIL,
		TOOL_ERASER,
		TOOL_RECT,
		TOOL_CIRCLE,
		TOOL_UNDO: 'Undo',
		TOOL_REDO: 'Redo',
		TOOL_MOVE: 'Move',
	},
	color: {
		WHITE: '#FFFFFF',
		BLACK: '#000000',
		YELLOW: '#FFFF00',
		BLUE: '#0000FF',
		RED: '#FF0000',
		GREEN: '#32CD32',
	},
	size: {
		SIZE_A: 5,
		SIZE_B: 10,
		SIZE_C: 15,
		SIZE_D: 20,
		SIZE_E: 25,
		SIZE_F: 30,
	}
}
