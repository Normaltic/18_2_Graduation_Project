import React from 'react';
import { Link } from 'react-router-dom';

import ListTable from './ListTable';

export default (props) => {

	const colGroupList = [
		"25%",
		"50%",
		"25%"
	]

	const headerList = [
		"교과 번호",
		"교과명",
		"담당 강사"
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
			강의 리스트
			<br />
			<br />
			<div className="Static_Divider"> </div>
			{ ListTable(colGroupList, headerList, props.lectureList, itemObjectKey, handleClick) }
		</div>
	)
};
