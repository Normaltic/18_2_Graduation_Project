import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import ListTable from './ListTable';

export default class BoardList extends React.Component {

	constructor(props) {
		super(props);

		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleAddBoard = this.handleAddBoard.bind(this);

		this.state = {
			modalOpen: false
		}
	}

	handleModalOpen() {
		this.setState({
			modalOpen: true
		});
	}

	handleModalClose() {
		this.setState({
			modalOpen: false
		});
	}

	handleAddBoard() {

		this.handleModalClose();
	}
	
	render() {

		const colGroupList = [
			"25%",
			"25%",
			"25%",
			"25%"
		]

		const headerList = [
			"번호",
			"판서 명",
			"개설일",
			"마지막 작성일",
		]	

		const itemObjectKey = [
			"bNum",
			"bName",
			"createDate",
			"updateDate"
		]

		const actions = [
			<RaisedButton
				label="Cancel"
				onClick={this.handleModalClose}
			/>,
			<RaisedButton
				label="Add"
				onClick={this.handleAddBoard}
			/>
		]

		const props = this.props;

		return (
			<div>
				<Dialog
					title="새 판서 페이지 추가"
					actions={actions}
					modal={true}
					open={this.state.modalOpen} >
					
				</Dialog>

				{ props.lectureInfo.lName + ' (' + props.lectureInfo.lNum + ')' }
				<br />
				<br />
				<div className="Static_Divider"> </div>
				{ ListTable(colGroupList, headerList, props.boardList, itemObjectKey) }
				<div className="BoardList_addBoardButton_Wrapper Static_Flex">
					{ props.is_teacher ? <RaisedButton label="추가" primary={true} onClick={this.handleModalOpen}/> : null }
				</div>
			</div>
		)
	}
};
