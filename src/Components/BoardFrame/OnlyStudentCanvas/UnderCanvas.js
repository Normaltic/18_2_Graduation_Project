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
	pageData: state.BoardContent.get('pageData'),
});

const mapDispatchToProps = (dispatch) => ({
	createPage: () => dispatch(boardContentAction.createPage()),
	pushTeachItem: (item) => dispatch(boardContentAction.pushTeachItem(item)),
	undoTeachItem: (pageIndex) => dispatch(boardContentAction.undoTeachItem(pageIndex)),
	setTeachPreview: (pageIndex, imageData) => dispatch(boardContentAction.setTeachPreview({pageIndex, imageData})),

});

class UnderCanvas extends React.Component {

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

		return false;
	}

	componentWillUpdate(nextProps) {
	}

	componentDidUpdate() {
	}

	initializeSocketObject() {
		this.props.socketObject.on('broadcastTeachUp', (data) => {
			if( this.props.selectedPage != data.pageIndex ) {
				let newPageData = this.props.pageData[data.pageIndex].items.teachItemList.slice(0);
				newPageData.push(data.itemData);
				this.redrawCanvas(data.pageIndex, newPageData);
			}
			this.props.pushTeachItem(data);
		});
		this.props.socketObject.on('broadcastTeachUndo', (data) => {
			if( this.props.selectedPage != data ) {
				let newPageData = this.props.pageData[data].items.teachItemList.slice(0, -1);
				this.redrawCanvas(data, newPageData);
			}
			this.props.undoTeachItem(data);
		});
		this.props.socketObject.on('broadcastTeachRedo', (data) => {
			if( this.props.selectedPage != data.pageIndex ) {
				let newPageData = this.props.pageData[data.pageIndex].items.teachItemList.slice(0);
				newPageData.push(data.itemData);
				this.redrawCanvas(data.pageIndex, newPageData);
			}
			this.props.pushTeachItem(data);
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
			<canvas className="UnderCanvas"
				width={1920} height={1080}
				ref={ (ref) => this.canvasRef = ref }
				/>	
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UnderCanvas);
