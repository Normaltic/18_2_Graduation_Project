import React from 'react';
import { connect } from 'react-redux';

import * as toolAction from 'reducers/Tools';
import * as boardContentAction from 'reducers/BoardContent';

import toolImageBox from 'images/toolImage';
import toolValue from 'tools';

import './index.css';

const mapStateToProps = (state) => ({
	useTool: state.Tools.get('useTool'),
	colorOption: state.Tools.get('toolOption')[state.Tools.get('useTool')].color,
	sizeOption: state.Tools.get('toolOption')[state.Tools.get('useTool')].size,

	undoWork: state.Tools.get('undoWork'),
	redoWork: state.Tools.get('redoWork'),
});

const mapDispatchToProps = (dispatch) => ({
	setUseToolPencil: () => dispatch(toolAction.setUseToolPencil()),
	setUseToolEraser: () => dispatch(toolAction.setUseToolEraser()),
	setUseToolRect: () => dispatch(toolAction.setUseToolRect()),
	setUseToolCircle: () => dispatch(toolAction.setUseToolCircle()),
	setUseToolMove: () => dispatch(toolAction.setUseToolMove()),

	setToolColor: (color) => dispatch(toolAction.setToolColor(color)),
	setToolSize: (size) => dispatch(toolAction.setToolSize(size)),

	undoAction: () => dispatch(boardContentAction.undoMyItem()),
	redoAction: () => dispatch(boardContentAction.redoMyItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
	(props) => {
		let toolName = toolValue.type;
		let toolColor = toolValue.color;
		let toolSize = toolValue.size;

		return (
			<div className={props.className}>
				<div className="ToolMenu_ToolBox Static_Flex">
					{ ToolIcon(toolName.TOOL_PENCIL, props.useTool == toolName.TOOL_PENCIL, props.setUseToolPencil) }
					{ ToolIcon(toolName.TOOL_ERASER, props.useTool == toolName.TOOL_ERASER, props.setUseToolEraser) }
					{ ToolIcon(toolName.TOOL_RECT, props.useTool == toolName.TOOL_RECT, props.setUseToolRect) }
					{ ToolIcon(toolName.TOOL_CIRCLE, props.useTool == toolName.TOOL_CIRCLE, props.setUseToolCircle) }
					{ ToolIcon(toolName.TOOL_UNDO, false, props.undoWork) }
			 		{ ToolIcon(toolName.TOOL_REDO, false, props.redoWork) }
				</div>

				<div className="ToolMenu_ToolOptionBox Static_Flex">
					{ optionColorIcon(toolColor.BLACK, props.colorOption == toolColor.BLACK, props.setToolColor) }
					{ optionColorIcon(toolColor.WHITE, props.colorOption == toolColor.WHITE, props.setToolColor) }
					{ optionColorIcon(toolColor.YELLOW, props.colorOption == toolColor.YELLOW, props.setToolColor) }
					{ optionColorIcon(toolColor.BLUE, props.colorOption == toolColor.BLUE, props.setToolColor) }
					{ optionColorIcon(toolColor.RED, props.colorOption == toolColor.RED, props.setToolColor) }
					{ optionColorIcon(toolColor.GREEN, props.colorOption == toolColor.GREEN, props.setToolColor) }

					{ optionSizeIcon(toolSize.SIZE_A, props.sizeOption == toolSize.SIZE_A, props.setToolSize) }
					{ optionSizeIcon(toolSize.SIZE_B, props.sizeOption == toolSize.SIZE_B, props.setToolSize) }
					{ optionSizeIcon(toolSize.SIZE_C, props.sizeOption == toolSize.SIZE_C, props.setToolSize) }
					{ optionSizeIcon(toolSize.SIZE_D, props.sizeOption == toolSize.SIZE_D, props.setToolSize) }
					{ optionSizeIcon(toolSize.SIZE_E, props.sizeOption == toolSize.SIZE_E, props.setToolSize) }
					{ optionSizeIcon(toolSize.SIZE_F, props.sizeOption == toolSize.SIZE_F, props.setToolSize) }
				</div>

				<div className="ToolMenu_ToolBox Static_Flex">
					{ ToolIcon('Submit', false, props.handleSubmitListVisibility) }
					{ ToolIcon(toolName.TOOL_MOVE, props.useTool == toolName.TOOL_MOVE, props.setUseToolMove) }
				</div>
			</div>
		)
	}
);

const ToolIcon = (toolType, selected, handleClick = () => {}) => {
	const style = {
		background: 'white',
		marginBottom: '5px',
	}
	return (
		<img 
			style={style}
			className="ToolMenu_ImageStyle"
			width='90' height='90'
			src={ selected ? toolImageBox[toolType].active : toolImageBox[toolType].default }
			onClick={handleClick} />
	);
}

const optionColorIcon = (color, selected, handleClick = () => {} ) => {

	const style={
		border: selected ? '2px solid #00B0F0' : '2px solid black',
		padding: '0px',
		background: color,
		marginBottom: '2px',
	}

	return (
		<img
			style={style}
			onClick={ () => handleClick(color) }
			width='43' height='43' />
	)
}

const optionSizeIcon = (size, selected, handleClick = () => {} ) => {
	const style = {
		background: 'white',
		marginBottom: '2px',
	}
	return (
		<img
			style={style}
			src={ selected ? toolImageBox[size].active : toolImageBox[size].default }
			onClick={ () => handleClick(size) }
			width='43' height='43' />
	)
}
