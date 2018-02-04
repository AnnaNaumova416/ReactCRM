/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';

import ReactDOM from 'react-dom';
//import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
//import './styles/styles.css'; //Webpack can import CSS files too!
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './css/vendor.css';
// import './css/app-red.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/mainstyle.css';


/*import './css/style.css';
import './js/apps';*/
import './js/app';

// import './js/vendor';
//const store = configureStore();


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigoA200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: indigoA200,
    	primary2Color: indigoA200,
	},
});

ReactDOM.render((
	<MuiThemeProvider muiTheme={muiTheme}>
    	<Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>)
    ,document.getElementById('app')
);
