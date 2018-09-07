import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import Auth from './Auth';
import LectureNav from './LectureNav';

import * as authAction from 'reducers/Auth';
import * as lectureAction from 'reducers/Lecture';

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
	initializeSelect: () => dispatch(lectureAction.initializeSelect()),
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

		return (
			<div className={props.className}>
				<div className="SideMenu_LogoWrapper Static_Flex">
					<div className="SideMenu_LogoWrapper_Void"></div>
					<Logo className="SideMenu_LogoFrame"
						  handleMoveHome={handleMoveHome} />
				</div>
				<Auth className="SideMenu_AuthFrame" 
					  history={props.history}
					  status={props.authStatus}
					  uName={props.uName}
					  SignIn={props.SignIn}
					  SignOut={props.SignOut} />
				<LectureNav className="SideMenu_LectureNavFrame"
							status={props.authStatus}
							history={props.history}
							selected={props.selected}
							lectureList={props.lectureList}
							selectLecture={props.selectLecture}
							handleMoveLectureList={handleMoveLectureList} />
			</div>
		)
	}
);
