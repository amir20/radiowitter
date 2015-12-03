import React, { Component } from 'react'
import moment from 'moment'

export default class TimeAgo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        instances.push(this);
    }

    render() {
        return <span>{moment(this.props.date).fromNow()}</span>;
    }
}

const instances = [];
if(setInterval) {
    setInterval(() => instances.forEach(i => i.forceUpdate()), 60 * 1000);
}
