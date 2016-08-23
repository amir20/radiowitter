import React, {Component} from "react";
import youtube from "youtube-iframe-player";


export default class Player extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.promise = new Promise(resolve => {
            youtube.init(() => {
                const player = youtube.createPlayer('player', {
                    playerVars: {'controls': 2},
                    events: {
                        'onReady': event => resolve(player),
                        'onStateChange': event => {
                            switch (event.data) {
                                case YT.PlayerState.ENDED:
                                    this.props.actions.videoEnded();
                                    break;
                                case YT.PlayerState.PLAYING:
                                    this.props.actions.videoPlaying();
                                    break;
                                case YT.PlayerState.PAUSED:
                                    this.props.actions.videoPaused();
                                    break;
                            }
                        }
                    }
                });
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.nowPlaying.video === undefined
            || (nextProps.nowPlaying.video !== undefined && nextProps.nowPlaying.video.id !== this.props.nowPlaying.video.id);
    }

    componentDidUpdate() {
        const {video} = this.props.nowPlaying;
        if (video !== undefined) {
            this.promise.then(player => player.loadVideoById(video.id));
        }
    }

    pause() {
        this.promise.then(player => player.pauseVideo());
    }

    unpause() {
        this.promise.then(player => player.playVideo());
    }

    render() {
        return null;
    }
}



