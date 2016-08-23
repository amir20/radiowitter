import React, {Component} from "react";
import {connect} from "react-redux";
import TimeAgo from "./time_ago.jsx";

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { nowPlaying } = this.props;
        if (nowPlaying.video) {
            return (
                <div className="media now-playing">
                    <div className="media-body">
                        <h5 className="media-heading">{nowPlaying.video.title}</h5>
                        {nowPlaying.tweet.text}
                        <div className="when">
                            tweeted <TimeAgo date={new Date(nowPlaying.tweet.created_at)}/>
                        </div>
                    </div>
                    <div className="media-right">
                        <img className="media-object thumbnail" src={nowPlaying.video.thumbnail_url}/>
                    </div>
                </div>);
        } else {
            return <div>Loading...</div>;
        }
    }
}



