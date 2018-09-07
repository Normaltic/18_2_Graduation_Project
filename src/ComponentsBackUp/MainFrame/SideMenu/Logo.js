import React from 'react';

export default (props) => {

	return (
		<div className={props.className}
			onClick={props.handleMoveHome}>

			<img src={require('./Logo.png')}
				 width="200px" />

		</div>
	)
};
