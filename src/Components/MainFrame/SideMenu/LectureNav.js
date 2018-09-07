import React from 'react';

import { Link } from 'react-router-dom';

export default (props) => {

	const listItem = (item, key, handleSelect, flag) => (
		<p key={key} 
		   onClick={ (e) => handleSelect(item.lNum, key, props.history) }>
			{ flag ? <b>{"> " + item.lName}</b> : "> " + item.lName }
		</p>
	)

	const LectureList = () => (
		<React.Fragment>
			<p onClick={props.handleMoveLectureList} >
				Lecture List
			</p>
			{
				props.lectureList.map( 
					(item, i) => listItem(item, i, props.selectLecture, i == props.selected.listIndex ) 
				)
			}
		</React.Fragment>
	)

	return (
		<div className={props.className}>
			{ props.authStatus == 'SUCCESS' ? LectureList() : null }
		</div>
	)
};
