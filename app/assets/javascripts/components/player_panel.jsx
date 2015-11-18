import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Immutable from 'immutable'

import Twitter from '../services/twitter'
import Player from '../services/player'
import videoService from '../services/video_guess_service'
import Controls from './controls.jsx'
import NowPlaying from './now_playing.jsx'
import History from './history.jsx'


export default class PlayerPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {history: Immutable.List(), nowPlaying: null};
        this._twitter = new Twitter('RapRadar');
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
                    videoService(tweet)
                        .then(video => this.playVideo(tweet, video))
                        .catch(e => {
                            console.error(e);
                            this.playRandomTweet();
                        });
                } else {
                    // play random video when no tweet found
                    this.playRandomTweet();
                }
            }
        )
    }


    playRandomTweet() {
        this._twitter.nextRandomTweet().then(tweet => {
                videoService(tweet)
                    .then(video => this.playVideo(tweet, video))
                    .catch(e => {
                        console.error(e);
                        this.playRandomTweet();
                    });
            }
        )
    }

    changeStation(station) {
        this._twitter = new Twitter(station.handle);
        this.playNextMatch();
    }

    playVideo(tweet, video) {
        this._player.playVideo(video.id);
        if (this.state.nowPlaying != null) {
            this.setState({history: this.state.history.unshift(this.state.nowPlaying)});
        }
        this.setState({nowPlaying: {tweet: tweet, video: video}});
    }


    render() {
        return (
            <div>
                <Controls onNext={this.playNextMatch.bind(this)}
                          queue={this._twitter.queuedTweets()}
                          player={this._player}
                          onStationChange={this.changeStation.bind(this)}/>
                <NowPlaying data={this.state.nowPlaying}/>
                <History list={this.state.history}/>
            </div>
        )
    }
}
