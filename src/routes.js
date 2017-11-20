import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App 			from './App';
import BlogHome from './BlogHome';
import BlogPost from './BlogPost';

const Routes = (props) => (
	<BrowserRouter { ...props }>
		<App>
			<Switch>
				<Route path="/" exact component={BlogHome} />
				<Route path="/p/:page" component={BlogHome} />
				<Route path="/page/:slug" component={BlogPost} />
			</Switch>
		</App>
	</BrowserRouter>
)

export default Routes;