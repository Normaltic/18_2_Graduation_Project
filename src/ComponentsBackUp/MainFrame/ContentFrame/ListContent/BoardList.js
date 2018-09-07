import React from 'react';

import ListTable from './ListTable';

export default (props) => {

	const colGroupList = [
		"25%",
		"25%",
		"25%",
		"25%"
	]

	const headerList = [
		"번호",
		"판서 명",
		"개설일",
		"마지막 작성일",
	]

	const itemObjectKey = [
		"bNum",
		"bName",
		"createDate",
		"updateDate"
	]

	return (
		<div>
			판서 리스트
			<br />
			<br />
			<div className="Static_Divider"> </div>
			{ ListTable(colGroupList, headerList, props.boardList, itemObjectKey) }
		</div>
	)
};
