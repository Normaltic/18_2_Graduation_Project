import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import Pencil from 'tools/Pencil';
import Eraser from 'tools/Eraser';
import Rect from 'tools/Rect';
import Circle from 'tools/Circle';
import toolValue from 'tools';

import * as boardContentAction from 'reducers/BoardContent';
import * as toolAction from 'reducers/Tools';

const mapStateToProps = (state) => ({
	selectedPage: state.BoardContent.get('selectedPage'),
	pageDataLength: state.BoardContent.get('pageData')[state.BoardContent.get('selectedPage')].items.teachItemList.length,
	pageData: state.BoardContent.get('pageData')[state.BoardContent.get('selectedPage')].items.teachItemList,
});

const mapDispatchToProps = (dispatch) => ({
	createPage: () => dispatch(boardContentAction.createPage()),
	pushTeachItem: (item) => dispatch(boardContentAction.pushTeachItem(item)),
	undoTeachItem: (pageIndex) => dispatch(boardContentAction.undoTeachItem(pageIndex)),
	setTeachPreview: (pageIndex, imageData) => dispatch(boardContentAction.setTeachPreview({pageIndex, imageData})),

});

class BackCanvas extends React.Component {

	constructor(props) {
		super(props);

		this.canvasRef = null;
		this.canvasElement = null;
		this.toolBox = null;

		this.initializeSocketObject = this.initializeSocketObject.bind(this);
		this.initializeToolBox = this.initializeToolBox.bind(this);

		this.redrawCanvas = this.redrawCanvas.bind(this);
		this.updatePreview = this.updatePreview.bind(this);
	}

	componentDidMount() {
		this.canvasElement = findDOMNode(this.canvasRef);
		this.toolBox = this.initializeToolBox(this.canvasElement.getContext('2d'));
		this.initializeSocketObject();
	}

	shouldComponentUpdate(nextProps) {
		const flag1 = nextProps.selectedPage != this.props.selectedPage;
		const flag2 = nextProps.pageDataLength != this.props.pageDataLength;

		return flag1 || flag2;
	}

	componentWillUpdate(nextProps) {
		console.log("Toc");
		if( nextProps.selectedPage != this.props.selectedPage ) {
				this.redrawCanvas(nextProps.selectedPage, nextProps.pageData);
			return;
		} 
		if ( nextProps.pageDataLength < this.props.pageDataLength ) {
				this.redrawCanvas(nextProps.selectedPage, nextProps.pageData);
			return;
		}
		if ( nextProps.pageDataLength > this.props.pageDataLength ) {
			for( let i = this.props.pageDataLength; i < nextProps.pageDataLength; i++ )
				this.toolBox[nextProps.pageData[i].tool].reDrawWithData(nextProps.pageData[i]);
			this.updatePreview();
			console.log('did');
		};			
	}

	componentDidUpdate() {
	}

	initializeSocketObject() {
		this.props.socketObject.on('broadcastTeachDown', (data) => {
			if( this.props.selectedPage == data.pageIndex ) {
				let { itemData } = data;
				this.toolBox[itemData.tool].onMouseDown(
					itemData.points[0].x, itemData.points[0].y, { size: itemData.size, color: itemData.color } 
				);
			}
		});
		this.props.socketObject.on('broadcastTeachMove', (data) => {
			if( this.props.selectedPage == data.pageIndex ) {
				this.toolBox[data.itemData.tool].onMouseMove(
					data.itemData.points[data.itemData.points.length-1].x,
					data.itemData.points[data.itemData.points.length-1].y
				);
			}
		});
		this.props.socketObject.on('broadcastTeachUp', (data) => {
			if( this.props.selectedPage == data.pageIndex ) {
				this.toolBox[data.itemData.tool].onMouseUp(
					data.itemData.points[data.itemData.points.length-1].x,
					data.itemData.points[data.itemData.points.length-1].y
				);
			}
		});
		this.props.socketObject.on('broadcastTeachUndo', (data) => {
			if( this.props.selectedPage == data ) this.props.undoTeachItem(data);
		});
		this.props.socketObject.on('broadcastTeachRedo', (data) => {
			if( this.props.selectedPage == data.pageIndex ) this.props.pushTeachItem(data);
		});
		this.props.socketObject.on('broadcastTeachCreatePage', (data) => {
			this.props.createPage();
		});
	}

	initializeToolBox(canvasContext) {
		return {
			[toolValue.type.TOOL_PENCIL]: Pencil(canvasContext),
			[toolValue.type.TOOL_ERASER]: Eraser(canvasContext),
			[toolValue.type.TOOL_RECT]: Rect(canvasContext),
			[toolValue.type.TOOL_CIRCLE]: Circle(canvasContext)
		}
	}

	redrawCanvas(pageIndex = this.props.selectedPage, pageData = this.props.pageData) {
		this.canvasElement.width = 1920;
		pageData.forEach( (item) => this.toolBox[item.tool].reDrawWithData(item) );
		this.updatePreview(pageIndex);
	}

	updatePreview(pageIndex = this.props.selectedPage) {
		let imageData = this.canvasElement.toDataURL();
		this.props.setTeachPreview(pageIndex, imageData);
	}

	render() {
		return (
			<canvas className="BackCanvas"
				width={1920} height={1080}
				ref={ (ref) => this.canvasRef = ref }
				/>	
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BackCanvas);
