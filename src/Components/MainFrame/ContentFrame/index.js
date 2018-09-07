import React from 'react';
import { Route } from 'react-router-dom';

import HomeContent from './HomeContent';
import ListContent from './ListContent';

import './index.css';

export default (props) => {

	return (
		<div className={props.className}>
			<Route exact path="/" component={HomeContent} />
			<Route path="/lectureList" component={ListContent} />
		</div>
	)
};
