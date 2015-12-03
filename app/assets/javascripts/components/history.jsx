import React, { Component } from 'react'
import TimeAgo from './time_ago.jsx'

export default class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.list.isEmpty()) {
            return <div className="history"></div>;
        }
        return (
            <div className="history">
                <h4>Play History</h4>
                <ul className="list-unstyled">
                    {
                        this.props.list.map(item => {
                            return (
                                <li className="media" key={item.tweet.id_str}>
                                    <div className="media-left">
                                        <img className="media-object thumbnail"
                                             src={item.video.thumbnail_url}/>
                                    </div>
                                    <div className="media-body">
                                        <div className="media-heading title">{item.video.title}</div>
                                        <div className="when">
                                            tweeted <TimeAgo date={new Date(item.tweet.created_at)}/>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}
