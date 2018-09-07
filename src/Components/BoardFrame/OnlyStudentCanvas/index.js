import React from 'react';

import BackCanvas from './BackCanvas';
import UnderCanvas from './UnderCanvas';

const withTeachFlag = (WrappedComponent1, WrappedComponent2) => (props) => 
	props.is_teacher
		? null
		: (
			<React.Fragment>
				<WrappedComponent1 {...props} />
				<WrappedComponent2 {...props} />
			</React.Fragment>
		)

export default withTeachFlag(BackCanvas, UnderCanvas);
