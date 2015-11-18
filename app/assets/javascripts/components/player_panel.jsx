import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Immutable from 'immutable'
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap';

import Twitter from '../services/twitter'
import Player from '../services/player'
import videoService from '../services/video_guess_service'
import Controls from './controls.jsx'
import NowPlaying from './now_playing.jsx'
import History from './history.jsx'


export default class PlayerPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {history: Immutable.List(), nowPlaying: null, showModal: false};
        this._twitter = new Twitter('Beats1Plays');
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

    playVideo(tweet, video) {
        this._player.playVideo(video.id.videoId);
        if (this.state.nowPlaying != null) {
            this.setState({history: this.state.history.unshift(this.state.nowPlaying)});
        }
        this.setState({nowPlaying: {tweet: tweet, video: video}});
    }


    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose a Twitter Handle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Overflowing text to show scroll behavior</h4>
                        <ul>
                        </ul>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p>
                        <p>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                            scelerisque
                            nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                            fringilla.
                        </p>
                    </Modal.Body>
                </Modal>

                <Row>
                    <Col md={6}>
                        <Controls onNext={this.playNextMatch.bind(this)}
                                  queue={this._twitter.queuedTweets()}
                                  player={this._player}/>
                    </Col>
                    <Col md={6}>
                        <Button bsSize="small" onClick={() => this.setState({ showModal: true})}>
                            Change Station
                        </Button>
                    </Col>
                </Row>
                <NowPlaying data={this.state.nowPlaying}/>
                <History list={this.state.history}/>
            </div>
        )
    }
}
