import React from 'react';

import ListTable from 'Components/common/ListTable';

const colGroupList = [
	"30%", "70%",
]

const headerList = [
	"Student Num", "Name"
];

const itemObjectKey = [
	"uNum", "uName"
]

export default (props) => {

	if( props.contents.length == 0 ) return null;

	return ListTable(colGroupList, headerList, props.contents, itemObjectKey, props.handleStudentClick);
}
