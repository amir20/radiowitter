import React, {Component} from "react";
import TimeAgo from "./time_ago.jsx";

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data) {
            return (
                <div className="media now-playing">
                    <div className="media-body">
                        <h5 className="media-heading">{this.props.data.video.title}</h5>
                        {this.props.data.tweet.text}
                        <div className="when">
                            tweeted <TimeAgo date={new Date(this.props.data.tweet.created_at)}/>
                        </div>
                    </div>
                    <div className="media-right">
                        <img className="media-object thumbnail" src={this.props.data.video.thumbnail_url}/>
                    </div>
                </div>);
        } else {
            return <div>Loading...</div>;
        }
    }
}


