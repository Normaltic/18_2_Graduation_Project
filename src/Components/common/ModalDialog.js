import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default (props) => {

	const actions = [
		<FlatButton {...props.actions.left} />,
		<FlatButton {...props.actions.right} />
	]

	return (
		<Dialog
			title={props.dialog.title}
			actions={actions}
			modal={true}
			open={props.dialog.open}
		>
			{props.children}
		</Dialog>
	)
};
