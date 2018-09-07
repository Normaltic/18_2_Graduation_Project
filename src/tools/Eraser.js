
export const TOOL_ERASER = 'Eraser';

export default (context) => {

	let stroke = null;
	let points = [];

	const onMouseDown = (x, y, { size , color } ) => {
		stroke = {
			tool: TOOL_ERASER,
			color: null,
			size: size,
			points: [{x, y}]
		};

		return [stroke];
	};

	const getToolType = () => {
		if( stroke ) return stroke.tool;
		return null;
	};

	const drawLine = ( item, start, end ) => {
		context.save();
		context.globalCompositeOperation = 'destination-out';
		context.beginPath();
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.lineWidth = item.size;
		context.beginPath();
		context.moveTo(start.x, start.y);
		context.lineTo(end.x, end.y);
		context.stroke();
		context.restore();
	};

	const onMouseMove = (x,y) => {
		if( !stroke ) return [];
		const newPoint = { x, y };
		const start = stroke.points.slice(-1)[0];
		drawLine(stroke, start, newPoint);
		stroke.points.push(newPoint);
		points.push(newPoint);

		return [stroke];
	};

	const onMouseUp = (x,y) => {
		if( !stroke ) return;
		onMouseMove(x,y);
		points = [];
		const strokeData = Object.assign({},stroke);
		strokeData.points.push({x,y});
		stroke = null;

		return [strokeData];
	};

	const reDrawWithData = (item, animate) => {
		let time = 0;
		const j = item.points.length;
		for( let i = 0; i < j; i++ ) {
			if( !item.points[i-1] ) continue;
			else {
				drawLine(item, item.points[i-1], item.points[i]);
			}
		}
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
