import React from 'react';
import { findDOMNode } from 'react-dom';
import { default as Pencil } from 'tools/Pencil';

export default (props) => {

	let canvas = null;
	let canvasRef = null;
	let canvasSize = {
		width: window.innerWidth < 1100 ? window.innerWidth - 100 : 800,
		height: window.innerHeigth < 400 ? window.innerHeight - 100 : 400
	};
	let PenTool = null;
	let is_drawing = false;
	let is_touch = false;

	const initialize = (ref) => {

		if( !ref ) return;

		canvasRef = ref;
		canvas = findDOMNode(canvasRef);

		PenTool = Pencil(canvas.getContext('2d'));
	}

	const getCousorPosition = (e) => {
		let { top, left } = canvas.getBoundingClientRect();
		let { clientX, clientY } = is_touch ? e.changedTouches['0'] : e;

		return [
			clientX - left,
			clientY - top
		];
	}

	const onMouseDown = (e, touch = false) => {
		e.preventDefault();
		is_touch = touch;
		is_drawing = true;
		PenTool.onMouseDown( ...getCousorPosition(e), '#000', 10, null);
	}

	const onMouseMove = (e) => {
		e.preventDefault();
		if( is_drawing ) PenTool.onMouseMove( ...getCousorPosition(e) );
	}

	const onMouseUp = (e) => {
		e.preventDefault();
		if( is_drawing ) {
			is_touch = false;
			is_drawing = false;
			PenTool.onMouseUp( ...getCousorPosition(e) );
		}
	}

	return (
		<div className="HomeContent_Frame">
			Test Writing!
			<br /><br />
			<div className="HomeContent_CanvasFrame Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center" id="canvasWrapper" >
				<canvas className="HomeContent_Canvas"
					{...canvasSize}
					ref={initialize}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
		     		onMouseOut={onMouseUp}
		   			
					onTouchStart={ (e) => onMouseDown(e, true) }
					onTouchMove={onMouseMove}
					onTouchEnd={onMouseUp}
					onTouchCancel={onMouseUp} />
			</div>
		</div>
	)
};
