import React from 'react';

import TeacherModal from './TeacherModal';
import StudentModal from './StudentModal';

const WithIsTeacher  = (TeachComponent, StudentComponent) => (props) => 
	props.is_teacher
	? <TeachComponent {...props} />
	: <StudentComponent {...props} />

export default WithIsTeacher(TeacherModal, StudentModal);
