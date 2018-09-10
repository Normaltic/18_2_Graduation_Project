import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import LastSubmitContent from './LastSubmitContent';

import * as submitContentAction from 'reducers/SubmitContent';

const mapStateToProps = (state) => ({
	uNum: state.Auth.get('uNum'),
	uName: state.Auth.get('uName'),
	previewImage: state.BoardContent.get('pageData')[state.BoardContent.get('selectedPage')].previews.myPreview,
	itemData: state.BoardContent.get('pageData')[state.BoardContent.get('selectedPage')].items.myItemList,
})

const mapDispatchToProps = (dispatch) => ({
	setSubmitListContent: (itemData) => dispatch(submitContentAction.setSubmitListContent(itemData)),
})
	
export default connect(mapStateToProps, mapDispatchToProps)(
	(props) => {

		if( !props.submitData ) return null;

		const handleSubmitContent = () => {
			let itemData = props.itemData.slice(0);
			props.setSubmitListContent(itemData);
			props.socketObject.emit('studentSubmitContent', {
				uNum: props.uNum,
				uName: props.uName,
				sNum: props.selectedIndex + 1,
				data: itemData
			});
			props.handleClose();
		}

		const actions = [
			<FlatButton secondary={true} label="Cancel" onClick={props.handleClose} />,
			<FlatButton primary={true} label="Submit" onClick={handleSubmitContent} />
		]

		return (
			<Dialog
				title={"Name : " + props.submitData.sName}
				actions={actions}
				open={props.openStatus}
				modal={true}
				contentStyle={modalContentStyle}>
				<div className="SubmitComponent_Children Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center">

					<div className="SubmitComponent_SelectedView Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center">
						<p>Selected Page Contents</p>
						<img
							border="2px solid black"
							width="384"
							height="216"
							src={props.previewImage} />
					</div>
					<LastSubmitContent contents={props.submitData.contents} />
				</div>
			</Dialog>
		)
	}
)

const modalContentStyle = {
	maxWidth: 'none',
	minWidth: '550px',
	paddingBottom: "25px",
}
