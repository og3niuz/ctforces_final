import React from 'react';

import { Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from 'lib/Routes';
import IndexPage from './index/Container';
import LoginPage from './login/Container';
import RegisterPage from './register/Container';
import UsersPage from './users';
import PostsPage from './posts';
import TasksPage from './tasks';
import ContestsPage from './contests';
import ConfirmEmailPage from './confirm_email/Container';
import ResetPasswordPage from './password_reset/Container';
import ResetPasswordConfirmPage from './confirm_password_reset/Container';
import SettingsPage from './settings';


class App extends React.Component {
    render = () => (
        <Switch>
            <PublicRoute exact path="/" component={IndexPage} />
            <PublicRoute exact path="/login/" component={LoginPage} />
            <PublicRoute exact path="/register/" component={RegisterPage} />
            <PublicRoute path="/users/" component={UsersPage} />
            <PublicRoute path="/posts/" component={PostsPage} />
            <PublicRoute path="/tasks/" component={TasksPage} />
            <PublicRoute path="/contests/" component={ContestsPage} />

            <PublicRoute path="/confirm_email/" component={ConfirmEmailPage} />
            <PublicRoute path="/reset_password/" component={ResetPasswordPage} />
            <PublicRoute path="/reset_password_confirm/" component={ResetPasswordConfirmPage} />

            <PrivateRoute path="/settings/" component={SettingsPage} />
        </Switch>
    )
}

export default App;
