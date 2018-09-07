import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainFrame from 'Components/MainFrame';
import BoardFrame from 'Components/BoardFrame';

import reducers from 'reducers';

import './index.css';

const rootElement = document.getElementById('root');

const store = createStore(reducers, applyMiddleware(ReduxThunk))
//const store = createStore(reducers, compose(applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<MuiThemeProvider>
				<Switch>
					<Route exact path="/board/:b_id" component={BoardFrame} />
					<Route path="/" component={MainFrame} />
				</Switch>
			</MuiThemeProvider>
		</Router>
	</Provider>
	
	, rootElement
);
