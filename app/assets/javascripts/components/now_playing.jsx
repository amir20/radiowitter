import React, { Component } from 'react'

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data) {
            return (
                <div className="media now-playing">
                    <h4>Now Playing</h4>
                    <div className="media-body">
                        <h5 className="media-heading">{this.props.data.video.snippet.title}</h5>
                        {this.props.data.tweet.text}
                    </div>
                    <div className="media-right">
                        <img className="media-object thumbnail" src={this.props.data.video.snippet.thumbnails.default.url}/>
                    </div>
                </div>);
        } else {
            return <div>Loading...</div>;
        }
    }
}


