import React from 'react';

import Pencil from 'tools/Pencil';
import Eraser from 'tools/Eraser';
import Rect from 'tools/Rect';
import Circle from 'tools/Circle';
import toolValue from 'tools';

let canvasElement = document.createElement('canvas');
canvasElement.width = 1920;
canvasElement.height = 1080;

let canvasContext = canvasElement.getContext('2d');

let toolBox = {
	[toolValue.type.TOOL_PENCIL]: Pencil(canvasContext),
	[toolValue.type.TOOL_ERASER]: Eraser(canvasContext),
	[toolValue.type.TOOL_RECT]: Rect(canvasContext),
	[toolValue.type.TOOL_CIRCLE]: Circle(canvasContext),
}

export default (props) => {

	if( props.contents.length == 0 ) return null;

	canvasContext.clearRect(0, 0, 1920, 1080);

	props.contents.forEach( (item) => {
		toolBox[item.tool].reDrawWithData(item) 
	});

	let imageData = canvasElement.toDataURL();

	return (
		<div className="SubmitComponent_LastSubmitView Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center" >
			<p> Last Submit Contents </p>
			<img
				border="2px solid black"
				width="384"
				height="216"
				src={imageData} />
		</div>
	)
}
			
	
