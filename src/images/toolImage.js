import toolValue from 'tools';

export default {
	[toolValue.type.TOOL_PENCIL]: {
		default: require('images/Pencil.png'),
		active: require('images/Pencil_Active.png'),
	},
	[toolValue.type.TOOL_ERASER]: {
		default: require('images/Eraser.png'),
		active: require('images/Eraser_Active.png'),
	},
	[toolValue.type.TOOL_RECT]: {
		default: require('images/Rect.png'),
		active: require('images/Rect_Active.png'),
	},
	[toolValue.type.TOOL_CIRCLE]: {
		default: require('images/Circle.png'),
		active: require('images/Circle_Active.png'),
	},
	[toolValue.type.TOOL_UNDO]: {
		default: require('images/Undo.png'),
		active: null,
	},
	[toolValue.type.TOOL_REDO]: {
		default: require('images/Redo.png'),
		active: null,
	},
	[toolValue.type.TOOL_MOVE]: {
		default: require('images/Move.png'),
		active: require('images/Move_Active.png'),
	},
	'Submit': {
		default: require('images/Submit.png'),
		active: null,
	},
	[toolValue.size.SIZE_A]: {
		default: require('images/Dot1.png'),
		active: require('images/Dot1_Active.png'),
	},
	[toolValue.size.SIZE_B]: {
		default: require('images/Dot2.png'),
		active: require('images/Dot2_Active.png'),
	},
	[toolValue.size.SIZE_C]: {
		default: require('images/Dot3.png'),
		active: require('images/Dot3_Active.png'),
	},
	[toolValue.size.SIZE_D]: {
		default: require('images/Dot4.png'),
		active: require('images/Dot4_Active.png'),
	},
	[toolValue.size.SIZE_E]: {
		default: require('images/Dot5.png'),
		active: require('images/Dot5_Active.png'),
	},
	[toolValue.size.SIZE_F]: {
		default: require('images/Dot6.png'),
		active: require('images/Dot6_Active.png'),
	}
}
