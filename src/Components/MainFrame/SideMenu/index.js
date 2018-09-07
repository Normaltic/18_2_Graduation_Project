import React from 'react';
import { connect } from 'react-redux';

import WrappedItem from './WrappedItem';

import * as authAction from 'reducers/Auth';
import * as lectureAction from 'reducers/Lecture';

import Drawer from 'material-ui/Drawer';

import './index.css';

const mapStateToProps = (state) => ({
	authStatus: state.Auth.get('status'),
	uName: state.Auth.get('uName'),

	selected: state.Lecture.get('selected'),
	lectureList: state.Lecture.get('lectureList')
});

const mapDispatchToProps = (dispatch) => ({
	SignIn: (id, pw) => dispatch(authAction.SignIn(id, pw)),
	SignOut: () => dispatch(authAction.SignOut()),

	selectLecture: (lNum, listIndex, history) => dispatch(lectureAction.selectLecture({lNum, listIndex, history})),
	initializeSelect: () => dispatch(lectureAction.setSelectedInitialize()),
});

export default connect(mapStateToProps,mapDispatchToProps)(

	(props) => {

		const handleMoveHome = (e) => {
			props.initializeSelect();
			props.history.push('/');
		};

		const handleMoveLectureList = (e) => {
			props.initializeSelect();
			props.history.push('/lectureList');
		}

		const logoProps = {
			className: "SideMenu_LogoFrame",
			handleMoveHome: handleMoveHome
		}

		const authProps = {
			className: "SideMenu_AuthFrame",
			uName: props.uName,
			SignIn: props.SignIn,
			SignOut: props.SignOut,
		}

		const lectureNavProps = {
			className: "SideMenu_LectureNavFrame",
			selected: props.selected,
			lectureList: props.lectureList,
			selectLecture: props.selectLecture,
			handleMoveLectureList: handleMoveLectureList
		};

		const commonProps = {
			history: props.history,
			authStatus: props.authStatus,
			handleDrawerClose: props.handleDrawerClose
		}

		if( props.mobile == true ) {
			return (
				<Drawer docked={false}
						open={props.drawerOpen}
						containerClassName={props.className}
						onRequestChange={props.handleRequestChange}>
						<WrappedItem logoProps={logoProps}
									 authProps={authProps}
									 lectureNavProps={lectureNavProps}
									 commonProps={commonProps} />
				</Drawer>
			)
		} else {
			return (
				<div className={props.className}>
						<WrappedItem logoProps={logoProps}
									 authProps={authProps}
									 lectureNavProps={lectureNavProps}
									 commonProps={commonProps} />
				</div>
			)
		}
	}
);
