import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './views/content/home/Home';
import Theme from './views/content/theme/Theme';
import Love from './views/content/theme/love/Love';
import LastWill from './views/content/theme/last_will/LastWill';
import Anything from './views/content/theme/anything/Anything';
import './../App.css';

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={(<div>Loading...</div>)}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/theme/choose" component={Theme} />
					<Route exact path="/theme/love" component={Love} />
					<Route exact path="/theme/last_will" component={LastWill} />
					<Route exact path="/theme/anything" component={Anything} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
