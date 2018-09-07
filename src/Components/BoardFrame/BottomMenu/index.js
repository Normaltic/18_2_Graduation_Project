import React from 'react';
import { connect } from 'react-redux';
import * as boardContentAction from 'reducers/BoardContent';

import PreviewImg from './PreviewImg';

import './index.css';

const mapStateToProps = (state) => ({
	is_teacher: state.Auth.get('is_teacher'),
	selectedPage: state.BoardContent.get('selectedPage'),
	pageData: state.BoardContent.get('pageData'),
})

const mapDispatchToProps = (dispatch) => ({
	selectPage: (pageIndex) => dispatch(boardContentAction.selectPage(pageIndex)),
	createPage: () => dispatch(boardContentAction.createPage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
	(props) => {

		const handleAddBtnClick = () => {
			props.createPage();
			props.socketObject.emit('teachCreateNewPage',{});
			props.selectPage(props.pageData.length-1);
		}

		const addBtnClick = (
			<div 
				className="BottomMenu_CreateWrapper Static_Flex Static_Flex_Align_Center Static_Flex_Justify_Center"
				onClick={handleAddBtnClick} >
				<span>+</span>
			</div>
		)

		return (
			<div className={props.className + " Static_Flex"}>
				<div className="BottomMenu_PreviewWrapper Static_Flex">
					{ 
						props.pageData.map( (item, i) => 
							<PreviewImg
							key={i}
							previews={ item.previews }
							selected={ props.selectedPage == i }
							onClick={ () => props.selectPage(i) } />
						)
					}
				</div>
				{ props.is_teacher ? addBtnClick : null }
			</div>
		)
	}
)
