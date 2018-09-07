import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import Pencil from 'tools/Pencil';
import Eraser from 'tools/Eraser';
import Rect from 'tools/Rect';
import Circle from 'tools/Circle';
import toolValue from 'tools';

import * as boardContentAction from 'reducers/BoardContent';
import * as submitContentAction from 'reducers/SubmitContent';
import * as toolAction from 'reducers/Tools';

const mapStateToProps = (state) => ({
	is_teacher: state.Auth.get('is_teacher'),
	uNum: state.Auth.get('uNum'),
	lNum: state.Lecture.get('selected').lNum,
	useTool: state.Tools.get('useTool'),
	toolOption: state.Tools.get('toolOption'),
	status: state.BoardContent.get('status'),
	selectedPage: state.BoardContent.get('selectedPage'),
	pageDataLength: state.BoardContent.get('pageData')[state.BoardContent.get('selectedPage')].items.myItemList.length,
	pageData: state.BoardContent.get('pageData')[state.BoardContent.get('selectedPage')].items.myItemList,
	AllpageData: state.BoardContent.get('pageData'),
});

const mapDispatchToProps = (dispatch) => ({
	pushMyItem: (itemData) => dispatch(boardContentAction.pushMyItem(itemData)),
	undoMyItem: (func) => dispatch(boardContentAction.undoMyItem(func)),
	redoMyItem: (func) => dispatch(boardContentAction.redoMyItem(func)),
	setMyPreview: (pageIndex, imageData) => dispatch(boardContentAction.setMyPreview({pageIndex, imageData})),
	setInitializeBoardContentStore: (boardData, memoData) => dispatch(boardContentAction.setInitializeBoardContentStore({boardData, memoData})),
	setSubmitListData: (submitList) => dispatch(submitContentAction.setSubmitListData(submitList)),

	setUndoWork: (func) => dispatch(toolAction.setUndoWork(func)),
	setRedoWork: (func) => dispatch(toolAction.setRedoWork(func)),
});

class FrontCanvas extends React.Component {

	constructor(props) {
		super(props);

		this.canvasRef = null;
		this.canvasElement = null;
		this.toolBox = null;
		this.drawingStatus = false;
		this.longTouchFlag = false;
		this.lastMousePosition = [0,0];
		this.timeOutID = null;

		this.handlePageOut = this.handlePageOut.bind(this);

		this.initializeSocketObject = this.initializeSocketObject.bind(this);
		this.initializeToolBox = this.initializeToolBox.bind(this);
		this.getEventPosition = this.getEventPosition.bind(this);

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.handleMiniToolToggle = this.handleMiniToolToggle.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);

		this.undoWork = this.undoWork.bind(this);
		this.redoWork = this.redoWork.bind(this);
		this.redrawCanvas = this.redrawCanvas.bind(this);
		this.updatePreview = this.updatePreview.bind(this);
	}

	handlePageOut() {
		if( !this.props.is_teacher ) {
			let list = [];
			for( let onePageData of this.props.AllpageData ) {
				let obj = {
					pageIndex: onePageData.pageIndex,
					items: onePageData.items.myItemList,
				}
				list.push(obj);
			}
			this.props.socketObject.emit('exitStudent', {
				uNum: this.props.uNum,
				itemList: list
			});
		} else this.props.socketObject.emit('exitTeacher', 'keke');
		return "keke";
	}

	componentDidMount() {
		this.canvasElement = findDOMNode(this.canvasRef);
		this.canvasContext = this.canvasElement.getContext('2d');
		this.toolBox = this.initializeToolBox(this.canvasContext);
		this.initializeSocketObject();

		console.log(this.props.match);
		this.props.setUndoWork(this.undoWork);
		this.props.setRedoWork(this.redoWork);
		this.props.socketObject.emit('initializeUserInfo', {
			b_id: this.props.b_id,
			uNum: this.props.uNum,
			is_teacher: this.props.is_teacher,
		});
		window.onbeforeunload = this.handlePageOut;
	}

	shouldComponentUpdate(nextProps) {
/*		const flag1 = nextProps.useTool != this.props.useTool;
		const flag2 = nextProps.selectedPage != this.props.selectedPage;
		const flag4 = nextProps.pageDataLength != this.props.pageDataLength;

		return flag1 || flag2 || flag4;*/
			if( nextProps.useTool === toolValue.type.TOOL_MOVE ) this.canvasElement.style.touchAction = 'auto';
		else this.canvasElement.style.touchAction = 'none';

		if ( nextProps.selectedPage != this.props.selectedPage ) {
			this.redrawCanvas(nextProps.selectedPage, nextProps.pageData);
		} else if ( nextProps.pageDataLength < this.props.pageDataLength ) {
			this.redrawCanvas(nextProps.selectedPage, nextProps.pageData);
		} else if( nextProps.pageDataLength > this.props.pageDataLength ) {
			for( let i = this.props.pageDataLength; i < nextProps.pageDataLength; i++ )
				this.toolBox[nextProps.pageData[i].tool].reDrawWithData(nextProps.pageData[i]);
			this.updatePreview();
		};
		return false;
	}

	componentWillUpdate(nextProps) {
		console.log("Tic");
/*		console.log(nextProps.selectedPage);
		if( nextProps.useTool === toolValue.type.TOOL_MOVE ) this.canvasElement.style.touchAction = 'auto';
		else this.canvasElement.style.touchAction = 'none';

		if ( nextProps.selectedPage != this.props.selectedPage ) {
			this.redrawCanvas(nextProps.selectedPage, nextProps.pageData);
		} else if ( nextProps.pageDataLength < this.props.pageDataLength ) {
			this.redrawCanvas(nextProps.selectedPage, nextProps.pageData);
		} else if( nextProps.pageDataLength > this.props.pageDataLength ) {
			for( let i = this.props.pageDataLength; i < nextProps.pageDataLength; i++ )
				this.toolBox[nextProps.pageData[i].tool].reDrawWithData(nextProps.pageData[i]);
			this.updatePreview();
		};*/
	}

	componentWillUnmount() {
		window.onbeforeunload = () => {};
		this.handlePageOut();
	}


	initializeSocketObject() {
		this.props.socketObject.on('initializeBoardData', (data) => {
			this.props.setInitializeBoardContentStore(data.boardData, data.memoData);
			console.log(data.submitData);
			this.props.setSubmitListData(data.submitData);
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

	getEventPosition(e) {
		let { clientX, clientY } = e.clientX ? e : e.changedTouches['0'] ;
		let { top, left } = this.canvasElement.getBoundingClientRect();
		clientX = parseInt(clientX);
		clientY = parseInt(clientY);
		return [
			clientX - left,
			clientY - top
		];
	};

	onMouseDown(e) {
	/*	this.longTouchFlag = true;
		let pos = this.getEventPosition(e);
		this.lastMousePosition = pos;
		this.timeOutID = setTimeout( this.handleMiniToolToggle, 800);*/

		if( this.props.useTool != toolValue.type.TOOL_MOVE ) {
			this.drawingStatus = true;
			let data = this.toolBox[this.props.useTool].onMouseDown(
				...this.getEventPosition(e),
				this.props.toolOption[this.props.useTool],
			);
			this.emitDrawData(data, 'down');
		}
	}

	onMouseMove(e) {
		let pos = this.getEventPosition(e);
		if( this.lastMousePosition[0] != pos[0] || this.lastMousePosition[1] != pos[1] ) clearTimeout( this.timeOutID);
		if( this.drawingStatus ) {
			let data = this.toolBox[this.props.useTool].onMouseMove(
				...this.getEventPosition(e)
			);
			this.emitDrawData(data, 'move');
		}
	}

	onMouseUp(e) {
		clearTimeout( this.timeOutID);
		if( this.drawingStatus ) {
			this.drawingStatus = false;
			let data = this.toolBox[this.props.useTool].onMouseUp(
				...this.getEventPosition(e)
			);
			this.emitDrawData(data, 'up');
			this.props.pushMyItem(data[0]);
			this.updatePreview();
		}
	}

	handleMiniToolToggle() {
		this.props.handleMiniToolMenuSetVisible({x: this.lastMousePosition[0], y: this.lastMousePosition[1]});
	}

	onTouchStart(e) {
		this.longTouchFlag = true;
		let pos = this.getEventPosition(e);
		this.lastMousePosition = this.getEventPosition(e);
		this.timeOutID = setTimeout( this.handleMiniToolToggle, 800);
		this.onMouseDown(e);		
	}

	emitDrawData(data, type) {
		if( !data || !this.props.is_teacher ) return;

		let drawData = Object.assign(
			{ pageIndex: this.props.selectedPage, }, 
			{ itemData: data[0]	}
		);
		if( type == 'down' ) this.props.socketObject.emit('drawingTeachDown', drawData);
		else if( type == 'move' ) this.props.socketObject.emit('drawingTeachMove', drawData);
		else if( type == 'up' ) this.props.socketObject.emit('drawingTeachUp', drawData);
	}

	undoWork() {
		this.props.undoMyItem( (pageIndex) => {
			if( this.props.is_teacher ) this.props.socketObject.emit('drawingTeachUndo', pageIndex);
		});
	}

	redoWork() {
		this.props.redoMyItem( (pageIndex, itemData) => {;
			if( this.props.is_teacher ) this.props.socketObject.emit('drawingTeachRedo', {
				pageIndex: pageIndex,
				itemData: itemData,
			});
		});
	}

	redrawCanvas(pageIndex = this.props.selectedPage, pageData = this.props.pageData) {
		this.canvasContext.clearRect(0, 0, 1920, 1080);
		pageData.forEach( (item) => this.toolBox[item.tool].reDrawWithData(item) );
		this.updatePreview(pageIndex);
	}

	updatePreview(pageIndex = this.props.selectedPage) {
		let imageData = this.canvasElement.toDataURL();
		this.props.setMyPreview(pageIndex, imageData);
	}


	render() {
		return (
			<canvas className={this.props.className} id="keke"
				width={1920} height={1080}

				ref={ (ref) => this.canvasRef = ref }

				onMouseDown={this.onMouseDown}
				onMouseMove={this.onMouseMove}
				onMouseUp={this.onMouseUp}
				onMouseOut={this.onMouseUp}

				onTouchStart={this.onTouchStart}
				onTouchMove={this.onMouseMove}
				onTouchEnd={this.onMouseUp}
				onTouchCancel={this.onMouseUp}

				/>	
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FrontCanvas);
