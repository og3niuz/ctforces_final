import React from 'react';

import Component from './Component';

class CalendarContainer extends React.Component {
    handleChange = (moment) => {
        const { name } = this.props.field;
        this.props.form.setFieldValue(name, moment);
    };

    render() {
        return <Component handleChange={this.handleChange} {...this.props} />;
    }
}

export default CalendarContainer;
