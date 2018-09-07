import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LectureList from './LectureList';
import BoardList from './BoardList';

import * as lectureAction from 'reducers/Lecture';

const mapStateToProps = (state) => ({
	lectureList: state.Lecture.get('lectureList'),
	boardList: state.Board.get('boardList'),
});

const mapDispatchToProps = (dispatch) => ({
	selectLecture: (lNum, listIndex, history) => dispatch(lectureAction.selectLecture({lNum, listIndex, history})),
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
							{...thisProps}
							boardList={props.boardList} />
					} 
				/>
			</React.Fragment>
		)
	}
);
