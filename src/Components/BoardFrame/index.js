import React from 'react';
import { connect } from 'react-redux';
import socketObject from 'socket.io-client';

import FrontCanvas from './FrontCanvas';
import OnlyStudentCanvas from './OnlyStudentCanvas';

import ToolMenu from './ToolMenu';
import MiniToolMenu from './MiniToolMenu';
import BottomMenu from './BottomMenu';
import SubmitComponent from './SubmitComponent';

import './index.css';

export default connect(
	(state) => ({
		is_teacher: state.Auth.get('is_teacher'),
	})
) (

	class BoardFrame extends React.Component {


		constructor(props) {
			super(props);

			this.miniToolMenuID = "MiniToolMenu";

			this.state = {
				socketObject: socketObject(),
				submitListVisibility: false,
				miniToolMenuVisibility: false,
				miniToolMenuX: 0,
				miniToolMenuY: 0,
			}
			this.handleSubmitListVisibility = this.handleSubmitListVisibility.bind(this);
			this.handleMiniToolMenuSetVisible = this.handleMiniToolMenuSetVisible.bind(this);
			this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
		}

		componentDidMount() {
			window.addEventListener('load', function() {

				setTimeout(scrollTo, 0, 0, 1);

			}, false);
		}

		handleSubmitListVisibility() {
			this.setState( { submitListVisibility: !this.state.submitListVisibility } );
		}

		handleMiniToolMenuSetVisible(pos) {
			this.setState({
				miniToolMenuVisibility: true,
				miniToolMenuX: pos.x,
				miniToolMenuY: pos.y,
			});
		}

		handleOnMouseDown(e) {
			e.stopPropagation();
			let obj = document.getElementById(this.miniToolMenuID);
			if( this.state.miniToolMenuVisibility ) {
				let eObj = e.target;
				while( eObj.parentNode ) {
					if( eObj == obj ) return;
					if( eObj.id == "BoardFrame_RootFrame" ) break;
					eObj = eObj.parentNode;
				}
				
				this.setState({ miniToolMenuVisibility: false });
			}
		}


		render() {
			return (
				<div className="BoardFrame_RootFrame" id="BoardFrame_RootFrame"
						onTouchStart={this.handleOnMouseDown}>
					<FrontCanvas className="FrontCanvas"
								 b_id={this.props.match.params.b_id}
								 socketObject={this.state.socketObject} check={this.check}
								 handleMiniToolMenuSetVisible={this.handleMiniToolMenuSetVisible}/>
					<OnlyStudentCanvas socketObject={this.state.socketObject}/>
					<ToolMenu className="ToolMenu"
							  handleSubmitListVisibility={this.handleSubmitListVisibility} />
					<MiniToolMenu 
								visible={this.state.miniToolMenuVisibility}
								elmID={this.miniToolMenuID}
								posX={this.state.miniToolMenuX}
								posY={this.state.miniToolMenuY} />
					<BottomMenu className="BottomMenu"
								socketObject={this.state.socketObject}/>
					<SubmitComponent submitListVisibility={this.state.submitListVisibility}
									 socketObject={this.state.socketObject} />
					<div className="background">
					</div>
				</div>
			)
		}
	}
)
/*
 
*/
