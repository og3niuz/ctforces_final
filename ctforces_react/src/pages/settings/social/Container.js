import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import withAuth from 'wrappers/withAuth';
import Component from './Component';

class SocialSettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        };
    }

    handleSubmit = async ({ values, actions }) => {
        const {
            first_name: firstName,
            last_name: lastName,
            hide_personal_info: hidePersonalInfo,
        } = values;
        try {
            await axios.put('/me/', {
                personal_info: {
                    first_name: firstName,
                    last_name: lastName,
                },
                hide_personal_info: hidePersonalInfo,
            });
            this.setState({
                redirect: `/users/${this.props.auth.user.username}/`,
            });
        } catch (error) {
            const errorData = error.response.data;
            Object.keys(errorData).forEach((key) => {
                actions.setFieldError(key, errorData[key]);
                actions.setFieldTouched(key, true, false);
            });
            actions.setSubmitting(false);
        }
    };

    render() {
        if (this.state.redirect !== null) {
            return <Redirect to={this.state.redirect} />;
        }

        return <Component handleSubmit={this.handleSubmit} auth={this.props.auth} />;
    }
}

export default withAuth(SocialSettingsPage);