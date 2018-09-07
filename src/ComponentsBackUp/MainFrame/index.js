import React from 'react';

import SideMenu from './SideMenu';
import PathNav from './PathNav';
import ContentFrame from './ContentFrame';

import './index.css';

export default (props) => {

	let { match, location, history } = props;

	return (
		<div className="MainFrame_Frame Static_Flex Static_Flex_Justify_Center">
			<div className="MainFrame_RedLine"> </div>
			<SideMenu className="MainFrame_InnerLeft Static_Flex" history={history} match={match}/>
			<div className="MainFrame_InnerRight" >
				<div className="MainFrame_InnerRight_Void"></div>
				<PathNav match={match} location={location} className="MainFrame_PathNav Static_Flex Static_Flex_Align_Center"/>
				<ContentFrame className="MainFrame_ContentFrame"/>
			</div>
		</div>
	)
}
