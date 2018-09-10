import React from 'react';
import { Link } from 'react-router-dom';

import ListTable from 'Components/common/ListTable';

export default (props) => {

	const colGroupList = [
		"25%",
		"50%",
		"25%"
	]

	const headerList = [
		"Lecture Num",
		"Title",
		"Professor"
	]

	const itemObjectKey = [
		"lNum",
		"lName",
		"lTeacher"
	]

	const handleClick = (itemIndex) => {
		let lNum = props.lectureList[itemIndex].lNum;
		props.selectLecture(lNum, itemIndex, props.history)
		.then( (result) => {
			props.history.push(`/lectureList/${lNum}`);
		})
		.catch( (err) => {
			console.log(err);
		});
	}

	return (
		<div>
			My Lecture List	
			<br />
			<br />
			<div className="Static_Divider"> </div>
			{ ListTable(colGroupList, headerList, props.lectureList, itemObjectKey, handleClick) }
		</div>
	)
};
