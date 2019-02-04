import React from 'react';

import Component from './Component';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class TaskCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        };
    }

    handleTag = async tag => {
        const response = await axios.get('/task_tags/search/', {
            params: {
                name: tag
            }
        });
        const tags = response.data;
        if (tags.length == 0 || tags[0].name !== tag) {
            const response = await axios.post('/task_tags/', {
                name: tag
            });
            const new_tag = response.data;
            return new_tag.id;
        } else {
            return tags[0].id;
        }
    };

    handleSubmit = async ({ values, actions }) => {
        const tags_names = values.tags;
        let tags = [];
        for (let i = 0; i < tags_names.length; ++i) {
            const tag = tags_names[i];
            tags.push(await this.handleTag(tag));
        }

        let uploading_status = {};
        let upload_promises = [];
        for (let i = 0; i < values.files.length; ++i) {
            const file = values.files[i];
            let formData = new FormData();
            formData.append('file_field', file);
            upload_promises.push(
                axios.post('/task_files/', formData, {
                    onUploadProgress: progressEvent => {
                        uploading_status[file.name] = parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        );
                        actions.setStatus({
                            uploading: uploading_status
                        });
                    }
                })
            );
        }

        const data = await Promise.all(upload_promises);
        actions.setStatus({});
        let files = [];
        for (let i = 0; i < values.files.length; ++i) {
            files.push(data[i].data.id);
        }

        try {
            const response = await axios.post('/tasks/', {
                ...values,
                tags,
                files
            });
            const { id } = response.data;
            this.setState({
                redirect: `/tasks/${id}`
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

export default TaskCreateContainer;