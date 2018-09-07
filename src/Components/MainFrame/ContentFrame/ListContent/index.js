import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LectureList from './LectureList';
import BoardList from './BoardList';

import * as lectureAction from 'reducers/Lecture';
import * as boardAction from 'reducers/Board';

import './index.css';

const mapStateToProps = (state) => ({
	is_teacher: state.Auth.get('is_teacher'),
	lectureList: state.Lecture.get('lectureList'),
	boardList: state.Board.get('boardList'),
	selectedLecture: state.Lecture.get('selected'),
});

const mapDispatchToProps = (dispatch) => ({
	selectLecture: (lNum, listIndex, history) => dispatch(lectureAction.selectLecture({lNum, listIndex, history})),
	createNewBoard: (lNum, bName) => dispatch(boardAction.createNewBoard(lNum, bName)),

});

export default connect(mapStateToProps, mapDispatchToProps)(
	(props) => {

		return (
			<React.Fragment>
				<Route exact path="/lectureList" 
					render={ (thisProps) => 
						<LectureList 
							{...thisProps}
							lectureList={props.lectureList}
							selectLecture={props.selectLecture} />
					}
				/>
				<Route path="/lectureList/:lNum" 
					render={ (thisProps) =>
						<BoardList
							is_teacher={props.is_teacher}
							{...thisProps}
							lectureInfo={props.lectureList[props.selectedLecture.listIndex]}
							boardList={props.boardList}
							createNewBoard={props.createNewBoard} />
					} 
				/>
			</React.Fragment>
		)
	}
);
