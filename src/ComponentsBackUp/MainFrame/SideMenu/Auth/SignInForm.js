import React from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default (props) => {

	const tf = props.textField_style;
	const fb = props.flatButton_style;
	const tagID = props.tagID;
	
	return (
		<React.Fragment>
			<TextField
				id={tagID.idField}
				hintText="ID"
				underlineStyle={tf.underlineStyle}
				fullWidth={tf.fullWidth} />
			<TextField
				id={tagID.pwField}
				hintText="Password"
				type="password"
				underlineStyle={tf.underlineStyle}
				fullWidth={tf.fullWidth} />
			<br />
			<FlatButton
				label="SignIn"
				backgroundColor={fb.backgroundColor}
				hoverColor={fb.hoverColor}
				labelStyle={fb.labelStyle}
				onClick={props.handleSignIn}/>
		</React.Fragment>
	);
};
