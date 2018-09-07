import React from 'react';

export default (props) => {

	const style = {
		backgroundImage: `url(${props.previews.myPreview[0]}), url(${props.previews.teachPreview[0]})`,
		backgroundSize: 'contain',
		border: props.selected ? '2px solid #00B0F0' : '2px solid black',
		marginRight: '15px',
		padding: 0,
		width: '192px',
		height: '108px',
	}
	
	return (
		<div className="BottomMenu_Image" style={style} onClick={props.onClick}>
		</div>
	)
}
