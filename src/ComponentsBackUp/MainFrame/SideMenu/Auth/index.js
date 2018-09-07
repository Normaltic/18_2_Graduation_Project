import React from 'react';

import SignInForm from './SignInForm';
import UserView from './UserView.js';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default (props) => {

	const tagID = {
		idField: "Auth_Input_ID",
		pwField: "Auth_Input_PW"
	}

	const textField_style = {
		underlineStyle: {
			borderColor: '#000'
		},
		fullWidth: true
	}

	const flatButton_style = {
		backgroundColor: '#0099FF',
		hoverColor: '#00CCFF',
		labelStyle: {
			color: 'white',
			verticalAlign: 'initial'
		}
	}

	const handleSignIn = (e) => {
		let id = document.getElementById(tagID.idField).value;
		let pw = document.getElementById(tagID.pwField).value;
		props.SignIn(id, pw)
		.then( () => {
			console.log("Success");
			props.history.push('/lectureList');
		});
	}

	const handleSignOut = (e) => {
		props.SignOut();
		props.history.push('/');
	}

	const handleMoveHome = (e) => {
		props.history.push('/');
	}

	return (
		<div className={props.className + " Static_Flex Static_Flex_Align_Center" }>
		{	
			props.status == 'SUCCESS' ? 
				<UserView
					flatButton_style={flatButton_style}
					uName={props.uName}
					handleSignOut={handleSignOut}
					handleMoveHome={handleMoveHome}/>
			:
				<SignInForm
					flatButton_style={flatButton_style}
					textField_style={textField_style}
					tagID={tagID}
					handleSignIn={handleSignIn} />
		}	
		</div>
	)
};
