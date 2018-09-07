import React from 'react';

import SideMenu from './SideMenu';
import PathNav from './PathNav';
import ContentFrame from './ContentFrame';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import './index.css';

export default class MainFrame extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mobile: window.innerWidth < 1100 ? true : false,
			drawerOpen: false,
		}

		this.handleSize = this.handleSize.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleRequestChange = this.handleRequestChange.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);

		window.addEventListener('resize', this.handleSize);
	}

	handleSize(e = null) {
		let flag = false;
		if( window.innerWidth < 1100 ) flag = true;
		if( this.state.mobile != flag ) {
			this.setState({
				mobile: flag
			});
		}
	}

	handleToggle(e = null) {
		console.log(!this.state.drawerOpen);
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	}

	handleRequestChange(openFlag) {
		this.setState({
			drawerOpen: openFlag
		});
	};

	handleDrawerClose() {
		this.setState({
			drawerOpen: false
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			drawerOpen: false
		}
	}

	render() {
		console.log("asd");
		let { history, match, location } = this.props;

		let appBarStyle = {
			backgroundColor: '#E01938',
		}

		return (
			<React.Fragment>

				{ this.state.mobile ? 
					<AppBar title="Web Grimi" style={appBarStyle} onLeftIconButtonClick={this.handleToggle} />
					: <div className="MainFrame_RedLine"></div> 
				}
				<div className="MainFrame_Frame Static_Flex Static_Flex_Justify_Center">
					<SideMenu className="MainFrame_InnerLeft Static_Flex" 
						history={history} 
						mobile={this.state.mobile}
						drawerOpen={this.state.drawerOpen}
						handleRequestChange={this.handleRequestChange}
						handleDrawerClose={this.handleDrawerClose} />
					<div className="MainFrame_InnerRight">
						{ this.state.mobile ? null : <div className="MainFrame_InnerRight_Void"></div> }
						{ this.state.mobile ? null : <PathNav match={match} location={location} className="MainFrame_PathNav Static_Flex Static_Flex_Align_Center"/> }
						<ContentFrame className="MainFrame_ContentFrame"
									  mobile={this.state.mobile}/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
