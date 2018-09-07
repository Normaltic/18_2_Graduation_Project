import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';

const mapStateToProps = ({

})

const mapDispatchToProps = ({

})
	
export default (props) => {

	console.log(props);

	return (
		<Dialog
			title={"항목 이름 : " + props.submitData.sName}
			open={props.openStatus}
			modal={true}>
			
		</Dialog>
	)
}
