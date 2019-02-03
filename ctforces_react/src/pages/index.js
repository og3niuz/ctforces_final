import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import IndexPage from './index/Container';
import LoginPage from './login/Container';
import RegisterPage from './register/Container';
import UsersPage from './users';

import { Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from '../lib/Routes';

const App = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/" component={IndexPage} />
                <PublicRoute exact path="/login" component={LoginPage} />
                <PublicRoute exact path="/register" component={RegisterPage} />
                <PublicRoute path="/users" component={UsersPage} />
            </Switch>
        </Router>
    );
};

export default App;
