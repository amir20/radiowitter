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
        this.state = {history: Immutable.List(), nowPlaying: null, loading: true};
        this._player = new Player();
    }

    componentDidMount() {
        PubSub.subscribe('video.state', (msg, data) => {
            if (data == 'ENDED') {
                this.playNextMatch();
            }
        });

        this.refs.controls.initStations();
    }

    playNextMatch() {
        this.setState({loading: true});
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
        this.setState({loading: true});
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
        this.setState({nowPlaying: {tweet: tweet, video: video}, loading: false});
    }


    render() {
        return (
            <div>
                <Controls onNext={this.playNextMatch.bind(this)}
                          player={this._player}
                          loading={this.state.loading}
                          onStationChange={this.changeStation.bind(this)}
                          ref="controls"/>
                <NowPlaying data={this.state.nowPlaying}/>
                <History list={this.state.history}/>
            </div>
        )
    }
}
