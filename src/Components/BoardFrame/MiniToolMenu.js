import React from 'react';
import { connect } from 'react-redux';

import * as toolAction from 'reducers/Tools';

import toolImageBox from 'images/toolImage';
import toolValue from 'tools';

const mapStateToProps = (state) => ({
	useTool: state.Tools.get('useTool'),
	colorOption: state.Tools.get('toolOption')[state.Tools.get('useTool')].color,
	sizeOption: state.Tools.get('toolOption')[state.Tools.get('useTool')].size,

	undoWork: state.Tools.get('undoWork'),
	redoWork: state.Tools.get('redoWork'),
})

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
})



export default connect(mapStateToProps, mapDispatchToProps)(
	(props) => {

		if( !props.visible ) return null;

        let toolName = toolValue.type;
		let toolColor = toolValue.color;
		let toolSize = toolValue.size;


		let style = {
			border: '1px solid black',
			paddingTop: '3px',
			paddingLeft: '3px',
			paddingBottom: '3px',
			top: props.posY - 100,
			left: props.posX,
		}

		return (
			<div className="MiniToolMenu"
				id={props.elmID}
				style={style}>
				<div className="MiniToolMenu_ToolTypeFrame">
					{ ToolIcon(toolName.TOOL_PENCIL, props.useTool == toolName.TOOL_PENCIL, (e) => handleOnClick(e, props.setUseToolPencil)) }
					{ ToolIcon(toolName.TOOL_ERASER, props.useTool == toolName.TOOL_ERASER, (e) => handleOnClick(e, props.setUseToolEraser)) }
					{ ToolIcon(toolName.TOOL_RECT, props.useTool == toolName.TOOL_RECT, (e) => handleOnClick(e, props.setUseToolRect)) }
					{ ToolIcon(toolName.TOOL_CIRCLE, props.useTool == toolName.TOOL_CIRCLE, (e) => handleOnClick(e, props.setUseToolCircle)) }
				</div>
				<div className="MiniToolMenu_ToolOptionFrame">
					{ ToolIcon(toolName.TOOL_MOVE, props.useTool == toolName.TOOL_MOVE, (e) => handleOnClick(e,props.setUseToolMove)) }
					{ ToolIcon(toolName.TOOL_UNDO, false, (e) => handleOnClick(e,props.undoWork)) }
					{ ToolIcon(toolName.TOOL_REDO, false, (e) => handleOnClick(e,props.redoWork)) }
				</div>
			</div>
		)
	}
)
const handleOnClick = (e, cb) => {
	e.stopPropagation()
	cb();
}

const ToolIcon = (toolType, selected, handleClick = () => {}) => {
     const style = {
         background: 'white',
         marginBottom: '3px',
		 marginRight: '3px',
     }
             //className="ToolMenu_ImageStyle"
     return (
         <img
             style={style}
             width='55' height='55'
             src={ selected ? toolImageBox[toolType].active : toolImageBox[toolType].default }
             onTouchStart={handleClick} />
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

