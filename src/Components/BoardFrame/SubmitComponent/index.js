import React from 'react';
import { connect } from 'react-redux';

import * as submitContentAction from 'reducers/SubmitContent';

import ListTable from 'Components/common/ListTable';
import CreateSubmitModal from './CreateSubmitModal';
import ViewSubmitModal from './WithIsTeacher';

import './index.css'

const mapStateToProps = (state) => ({
	is_teacher: state.Auth.get('is_teacher'),

	selectedSubmitContent: state.SubmitContent.get('selectedSubmitContent'),
	selectedIndex: state.SubmitContent.get('selectedIndex'),
	submitList: state.SubmitContent.get('submitList')
});

const mapDispatchToProps = (dispatch) => ({
	createNewSubmit: (submitObject) => dispatch(submitContentAction.createNewSubmit(submitObject)),
	pushSubmitListContent: (studentContent) => dispatch(submitContentAction.pushSubmitListContent(studentContent)),
	selectSubmit: (submitIndex) => dispatch(submitContentAction.selectSubmit(submitIndex)),
	selectSubmitContent: (submitContentIndex) => dispatch(submitContentAction.selectSubmitContent(submitContentIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
	class SubmitComponent extends React.Component {

		constructor(props) {
			super(props);

			this.createModalProps = null;

			this.state = {
				createSubmitModalOpen: false,
				viewSubmitModalOpen: false,
			}

			this.handleCreateModalOpen = this.handleCreateModalOpen.bind(this);
			this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
			this.handleViewModalOpen = this.handleViewModalOpen.bind(this);
			this.handleViewModalClose = this.handleViewModalClose.bind(this);

			this.handleCreateNewSubmit = this.handleCreateNewSubmit.bind(this);
			this.handleSubmitClick = this.handleSubmitClick.bind(this);
		}

		componentDidMount() {
			this.props.socketObject.on('broadcastTeachCreateSubmit', (data) => {
				data.contents = [];
				this.props.createNewSubmit(data);
			});
			if( this.props.is_teacher ) {
				this.props.socketObject.on('recieveStudentSubmit', this.props.pushSubmitListContent);
			}
		}

		handleCreateModalOpen() {
			this.setState({createSubmitModalOpen: true});
		}

		handleCreateModalClose() {
			this.setState({createSubmitModalOpen: false});
		}

		handleViewModalOpen() {
			this.setState({viewSubmitModalOpen: true});
		}

		handleViewModalClose() {
			this.setState({viewSubmitModalOpen: false});
		}

		handleSubmitClick(index) {
			this.props.selectSubmit(index);
			this.handleViewModalOpen();
		}

		handleCreateNewSubmit() {
			let sName = document.getElementById(textFieldProps.id).value;

			if( !sName ) {
				alert("NOT TYPED NAME");
				return;
			}

			let newSubmit = {
				sNum: this.props.submitList.length+1,
				sName: sName,
			}

			this.props.socketObject.emit('teachCreateNewSubmit', newSubmit);
			newSubmit.contents = [];	
			this.props.createNewSubmit(newSubmit);
			this.handleCreateModalClose();
		}

		render() {

			if( !this.props.submitListVisibility ) return null;

			const createModalProps = {
				actions: {
					left: {
						label: "Cancel",
						secondary: true,
						onClick: this.handleCreateModalClose,
					},
					right: {
						label: "Add",
						primary: true,
						onClick: this.handleCreateNewSubmit,
					},
				},
				dialog: {
					title: "add SubmitList Item",
					open: this.state.createSubmitModalOpen,
				}
			}

			return (
				<React.Fragment>
					<div className="SubmitList_Frame" style={getSubmitListStyle(this.props.submitListVisibility)} >
						{ ListTable(colGroupList, headerList, this.props.submitList, itemObjectKey, this.handleSubmitClick) }
						{ this.props.is_teacher ? addBtnClick(this.handleCreateModalOpen) : null }
					</div>

					<CreateSubmitModal
						modalProps={createModalProps}
						textFieldProps={textFieldProps} />
					<ViewSubmitModal
						is_teacher={this.props.is_teacher}
						openStatus={this.state.viewSubmitModalOpen}
						selectedIndex={this.props.selectedIndex}
						selectedSubmitContent={this.props.selectedSubmitContent}
						submitData={this.props.submitList[this.props.selectedIndex]}
						handleClose={this.handleViewModalClose}
						handleStudentClick={this.props.selectSubmitContent}
						socketObject={this.props.socketObject} />
						
				</React.Fragment>
			)
		}
	}
);

const addBtnClick = (onClick) => (
	<div className="SubmitComponent_CreateWrapper Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center"
		onClick={onClick}>
		<span>+</span>
	</div>
)

const getSubmitListStyle = (flag) => ({
	position: 'fixed',
	zIndex: 1000,
	top: '203px',
	right: '221px',
	width: '230px',
	height: '400px',
	padding: '15px',
	border: '1px solid black',
	background: 'white',	
	visibility: flag ? 'inherit' : 'hidden',
})

const colGroupList = [
	"30%", "70%"
]

const headerList = [
	"Num", "Name"
]

const itemObjectKey = [
	"sNum", "sName"
]

const textFieldProps = {
	id: "CreateModal_InputName",
	hintText: "new SubmitList Item Name",
	underlineStyle: {
		borderColor: '#000'
	},
	fullWidth: true
}
