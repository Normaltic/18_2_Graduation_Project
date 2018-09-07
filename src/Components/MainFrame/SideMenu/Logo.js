import React from 'react';

export default (props) => {

	return (
		<div className={props.className + " Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center"}
			onClick={props.handleMoveHome}>

			<img src={require('./Logo.png')}
				 width="200px" />

		</div>
	)
};
