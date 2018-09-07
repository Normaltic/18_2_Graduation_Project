import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import Auth from './Auth';
import LectureNav from './LectureNav';

export default (props) => {

	return (
		<React.Fragment>
			<div className="SideMenu_LogoWrapper Static_Flex">
				<div className="SideMenu_LogoWrapper_Void"></div>
				<Logo {...props.logoProps} />
			</div>
			<Auth {...props.authProps}
				  {...props.commonProps} />
			<LectureNav {...props.lectureNavProps}
				{...props.commonProps} /> 
		</React.Fragment>
	)
};

