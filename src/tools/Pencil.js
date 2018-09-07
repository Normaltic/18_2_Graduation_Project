
export const TOOL_PENCIL = 'Pencil';

export default (context) => {

	let stroke = null;
	let points = [];
	let imageData = null;

	const onMouseDown = (x, y, { size, color } ) => {
		stroke = {
			tool: TOOL_PENCIL,
			color: color,
			size: size,
			points: [{x, y}],
		};

		imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
		return [stroke];
	};
	
	const getToolType = () => {
		if( stroke ) return stroke.tool;
		return null;
	};

	const drawLine = (item) => {
//		if( item.points.length < 6 ) return;
		let pointt = item.points;
		let i;
		
		if( pointt.length == 1 ) return;

		context.save();
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.beginPath();
		context.lineWidth = item.size;
		context.strokeStyle = item.color;
		context.globalCompositeOperation = 'source-over';
		context.moveTo(pointt[0].x,pointt[0].y);
		if( pointt.length == 2 ) {
			context.strokeStyle = item.color;
			context.fillStyle = item.color;
			context.arc(pointt[0].x, pointt[0].y, item.size/2, 0, 2 * Math.PI, true);
			context.closePath();
			context.fill();
		} else if( item.points.length == 3 ) {
			context.lineTo(pointt[1].x, pointt[1].y);
			context.lineTo(pointt[2].x, pointt[2].y);
			context.closePath();
			context.stroke();
		} else {
			for( i = 1; i < pointt.length - 2; i++ ) {
				let c = (pointt[i].x + pointt[i+1].x) / 2,
					d = (pointt[i].y + pointt[i+1].y) / 2;
				context.quadraticCurveTo(pointt[i].x, pointt[i].y, c, d);
			}
			context.quadraticCurveTo(pointt[i].x, pointt[i].y, pointt[i+1].x, pointt[i+1].y);
			context.stroke();
		}
		context.restore();
	};

	const onMouseMove = (x,y) => {
		if( !stroke ) return [];
		const newPoint = { x, y };
		context.clearRect(0,0,1920,1080);
		context.putImageData(imageData, 0,0);

		stroke.points.push(newPoint);
		points.push(newPoint);	
		drawLine(stroke);

		return [stroke];
	};

	const onMouseUp = (x,y) => {
		if( !stroke ) return;
		onMouseMove(x,y);
		let strokeData = Object.assign({},stroke);
		strokeData.points.push({x:x, y:y});
		stroke = null;
		points = [];
		imageData = null;

		return [strokeData];
	};

	const reDrawWithData = (item, animate) => {
		/*
		const j = item.points.length;
		for(let i = 0; i < j; i++ ) {
			if( !item.points[i-1] ) continue;
			else {
				drawLine(item, item.points[i-1], item.points[i]);
			}
		}*/
		drawLine(item);
	};

	return {
		onMouseDown,
		onMouseMove,
		onMouseUp,
		reDrawWithData,
		drawLine,
		getToolType
	};
};
