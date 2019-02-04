import React from 'react';

import Component from './Component';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class PostCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        };
    }

    handleSubmit = async ({ values, actions }) => {
        try {
            const response = await axios.post('/posts/', values);
            const { id } = response.data;
            this.setState({
                redirect: `/posts/${id}`
            });
        } catch (error) {
            const errorData = error.response.data;
            for (const key in errorData) {
                actions.setFieldError(key, errorData[key]);
                actions.setFieldTouched(key, true, false);
            }
            actions.setSubmitting(false);
        }
    };

    render() {
        if (this.state.redirect !== null) {
            return <Redirect to={this.state.redirect} />;
        }

        return <Component handleSubmit={this.handleSubmit} />;
    }
}

export default PostCreateContainer;