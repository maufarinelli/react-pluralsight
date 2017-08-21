import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Working with Data Module. Card Component
//import App from './Cards';
import App from './Game';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
registerServiceWorker();
