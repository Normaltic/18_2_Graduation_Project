import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ModalDialog from 'Components/common/ModalDialog';
import ListTable from 'Components/common/ListTable';

export default class BoardList extends React.Component {

	constructor(props) {
		super(props);

		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleAddBoard = this.handleAddBoard.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			modalOpen: false
		}

		this.colGroupList = [
			"25%",
			"25%",
			"25%",
			"25%"
		]

		this.headerList = [
			"Num",
			"Board Name",
			"Create at",
			"Update at",
		]	

		this.itemObjectKey = [
			"bNum",
			"bName",
			"createDate",
			"updateDate"
		]

		this.textField_style = {
			id: "AddBoardModal_InputName",
			hintText: "new Board Name",
			underlineStyle: {
				borderColor: '#000'
			},
			fullWidth: true
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
		let bName = document.getElementById(this.textField_style.id).value;

		if( !bName ) {
			alert("NOT TYPED NAME");
			return;
		}
		this.props.createNewBoard(
			this.props.lectureInfo.lNum,
			bName
		)
		.then( (result) => {
			this.handleModalClose();
		})
		.catch( (err) => {
			console.log(err);
		});
	}

	handleClick(itemIndex) {
		let b_id = this.props.boardList[itemIndex]._id;
		this.props.history.push(`/board/${b_id}`);
	}
	
	render() {

		const modalProps = {
			actions: {
				left: {
					label: "Cancel",
					secondary: true,
					onClick: this.handleModalClose,
				},
				right: {
					label: "Add",
					primary: true,
					onClick: this.handleAddBoard,
				},
			},
			dialog: {
				title: "add New Board",
				open: this.state.modalOpen,
			},
		}

		return (
			<div>
				<ModalDialog
					actions={modalProps.actions}
					dialog={modalProps.dialog}>

					<TextField
						id={this.textField_style.id}
						hintText={this.textField_style.hintText}
						underlineStyle={this.textField_style.underlineStyle}
						fullWidth={this.textField_style.fullWidth} />
						
				</ModalDialog>

				{ this.props.lectureInfo.lName + ' (' + this.props.lectureInfo.lNum + ')' }
				<br />
				<br />
				<div className="Static_Divider"> </div>
				{ ListTable(this.colGroupList, this.headerList, this.props.boardList, this.itemObjectKey, this.handleClick) }
				<div className="BoardList_addBoardButton_Wrapper Static_Flex">
					{ this.props.is_teacher ? <RaisedButton label="Add" primary={true} onClick={this.handleModalOpen}/> : null }
				</div>
			</div>
		)
	}
};
