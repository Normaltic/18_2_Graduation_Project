import React from 'react';

import FlatButton from 'material-ui/FlatButton';

export default (props) => {

	const fb = props.flatButton_style;

	return (
		<React.Fragment>
			<p>
				<b>{props.uName}</b> 님 환영합니다!
			</p>
			<FlatButton
				label="SignOut"
				backgroundColor={fb.backgroundColor}
				hoverColor={fb.hoverColor}
				labelStyle={fb.labelStyle}
				onClick={props.handleSignOut} />
		</React.Fragment>
	)
};
