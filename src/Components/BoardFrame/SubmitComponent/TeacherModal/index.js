import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import StudentList from './StudentList';
import SelectStudentContentView from './SelectStudentContentView';

import * as submitContentAction from 'reducers/SubmitContent';

const mapStateToProps = ({

})

const mapDispatchToProps = ({

})
	
export default (props) => {

	if( !props.submitData ) return null;

	const actions = [
		<FlatButton primary={true} label="Close" onClick={props.handleClose} />
	]

	return (
		<Dialog
			bodyClassName="body"
			contentClassName="content"
			overlayClassName="overlay"
			paperClassName="paper"
			overlayStyle={modalBodyStyle}
			title={"Name : " + props.submitData.sName}
			actions={actions}
			open={props.openStatus}
			modal={true}
			contentStyle={modalContentStyle}>
			<div className="SubmitComponent_Children Static_Flex">
				<div className="SubmitComponent_Children_StudentList">
					<StudentList contents={props.submitData.contents}
								 handleStudentClick={props.handleStudentClick} />
				</div>
				<SelectStudentContentView
					contentData={props.submitData.contents[props.selectedSubmitContent]} />
			</div>
		</Dialog>			
	)
}

const modalBodyStyle = {
}

const modalContentStyle = {
	display: 'flex',
	justifyContent: 'center',
	width: 'auto',
	maxWidth: 'none',
	paddingBottom: "25px"
}
