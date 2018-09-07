import React from 'react';

export default (props) => {

	const imgStyle = {
	}

	let canvas = document.createElement('canvas');
	let canvasContext = canvas.getContext('2d');
	canvas.width = 1920;
	canvas.height = 1080;
	
	let mine = new Image();
	let teach = new Image();

	mine.onload = function() {
		console.log("mine");
		canvasContext.drawImage(mine, 0, 0);
	}
	mine.src = props.previews.myPreview[0];
	teach.onload = function() {
		console.log("Teach");
		canvasContext.drawImage(teach, 0, 0);
		console.log(canvas.toDataURL());
	}
	teach.src = props.previews.teachPreview[0];

	let source = canvas.toDataURL();
//	console.log(source);

	const img = (
		<img 
			className="BottomMenu_Image"
			width= '192' height= '108'
			style={imgStyle}
			src={source}
		 	onClick={props.handleClick} />
	)

	
	return img;
}
