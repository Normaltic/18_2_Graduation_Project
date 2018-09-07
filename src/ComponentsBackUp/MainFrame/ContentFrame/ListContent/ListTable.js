import React from 'react';

import './ListTable.css';

export default (cGroupSet, headerSet, itemList, itemObjectKeyName, handleLineOnClick = () => {}) => {

	const cGroupMap = (value, key) => (
		<col key={key} width={value} />
	)

	const headerMap = (value, key) => (
		<th key={key} className="ListTable_Cell">{value}</th>
	)

	const bodyRowMap = (item, key) => (
		<tr key={key} onClick={ (e) => handleLineOnClick(key)} >
			{ itemObjectKeyName.map( (name, i) => bodyRowCellMap(item[name], i) ) }
		</tr>
	)		
	

	const bodyRowCellMap = (item, key) => (
		<td className={ key == 1 ? "ListTable_Cell ListTable_BaseName" : "ListTable_Cell" } key={key}>{item}</td>
	)
	
	return (
		<table className="ListTable_Table" width="100%" cellSpacing="0" cellPadding="10px" border="0">
			<colgroup>
				{ cGroupSet.map(cGroupMap) }
			</colgroup>
			<thead>
				<tr>
					{ headerSet.map(headerMap) }
				</tr>
			</thead>
			<tbody>
				{ itemList.map(bodyRowMap) }
			</tbody>
		</table>
	)
}
