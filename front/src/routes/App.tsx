import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from '@pages/home/Home';
import Theme from '@pages/theme/Theme';
import Love from '@pages/theme/love/Love';
import LastWill from '@pages/theme/last_will/LastWill';
import Anything from '@pages/theme/anything/Anything';
import '@routes/App.css';

function App(): JSX.Element {
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
