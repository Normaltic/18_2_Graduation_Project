import React from 'react';

import ModalDialog from 'Components/common/ModalDialog';
import TextField from 'material-ui/TextField';

export default (props) => {

	return (
		<ModalDialog
			actions={props.modalProps.actions}
			dialog={props.modalProps.dialog}>
			
			<TextField
				id={props.textFieldProps.id}
				hintText={props.textFieldProps.hintText}
				underlineStyle={props.textFieldProps.underlineStyle}
				fullWidth={props.textFieldProps.fullWidth} />
		</ModalDialog>
	)
}
