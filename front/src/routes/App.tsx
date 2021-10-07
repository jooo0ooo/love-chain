import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import '@routes/App.css';
import {routes} from '@routes/RouteList';

function App(): JSX.Element {
    const routeComponents = routes.map(({path, component}, key) => 
        <Route exact path={path} component={component} key={key} />);

    return (
        <BrowserRouter>
            <Suspense fallback={(<div>Loading...</div>)}>
                <Switch>
                    {routeComponents}
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;