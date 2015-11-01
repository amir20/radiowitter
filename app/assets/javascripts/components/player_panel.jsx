import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Immutable from 'immutable';

import Twitter from '../services/twitter';
import Youtube from '../services/youtube';
import Player from '../services/player';
import Controls from './controls.jsx'
import NowPlaying from './now_playing.jsx'
import History from './history.jsx'


export default class PlayerPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {history: Immutable.List(), nowPlaying: null};
        this._twitter = new Twitter();
        this._youtube = new Youtube();
        this._player = new Player();
    }

    componentDidMount() {
        this.playNextMatch();
        PubSub.subscribe('video.state', (msg, data) => {
            if (data == 'ENDED') {
                this.playNextMatch();
            }
        });
    }

    playNextMatch() {

        this._twitter.nextTweet().then(tweet => {
                if (tweet) {
                    this._youtube.findFirstMatch(tweet).then(video => {
                        this._player.playVideo(video.id.videoId);

                        if (this.state.nowPlaying != null) {
                            this.setState({history: this.state.history.unshift(this.state.nowPlaying)});
                        }
                        this.setState({nowPlaying: {tweet: tweet, video: video}});
                    });
                }
            }
        )
    }

    render() {
        return (
            <div>
                <Controls onNext={this.playNextMatch.bind(this)}
                          queue={this._twitter.queuedTweets()}
                          player={this._player}/>
                <NowPlaying data={this.state.nowPlaying}/>
                <History list={this.state.history}/>
            </div>
        )
    }
}
