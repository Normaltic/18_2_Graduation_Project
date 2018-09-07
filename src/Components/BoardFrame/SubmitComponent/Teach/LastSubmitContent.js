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
	toolValue.type.TOOL_PENCIL: Pencil(canvasContext),
	toolValue.type.TOOL_ERASER: Eraser(canvasContext),
	toolValue.type.TOOL_RECT: Rect(canvasContext),
	toolValue.type.TOOL_CIRCLE: Circle(canvasContext),
}

export default (props) => {
	canvasContext.clearRect(0, 0, 1920, 1080);

	props.contents.forEach( (item) => toolBox[item.type].reDrawWithData(item) );

	let imageData = canvasElement.toDataURL();

	return (
		<img
			width="576"
			height="324"
			src={imageData} />
	)
}
			
	
