import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ContestCreatePage from './create/Container';
// import ContestViewPage from './index/Container';
// import ContestEditPage from './edit/Container';

import { Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from '../../lib/Routes';

const Contests = () => {
    return (
        <Switch>
            <PrivateRoute
                exact
                path="/contests/create"
                component={ContestCreatePage}
            />
            {/* <PublicRoute
                exact
                path="/contests/:id"
                component={ContestViewPage}
            />
            <PrivateRoute
                exact
                path="/contests/:id/edit"
                component={ContestEditPage}
            /> */}
        </Switch>
    );
};

export default Contests;
