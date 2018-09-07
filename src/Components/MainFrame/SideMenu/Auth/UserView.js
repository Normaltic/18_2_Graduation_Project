import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

export default (props) => {

	return (
		<React.Fragment>
			<p>
				Welcome, <br /> <b>{props.uName}</b> !
			</p>
			<RaisedButton
				label="SignOut"
				primary={true}
				onClick={props.handleSignOut} />
		</React.Fragment>
	)
};
