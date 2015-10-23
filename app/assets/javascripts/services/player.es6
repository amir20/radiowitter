class Player {
    constructor() {
        this._playerReady = null;
    }

    playVideo(videoId) {
        this._player().then(player => {
            player.loadVideoById(videoId);
        });
    }

    pause() {
        this._player().then(player => {
            player.pauseVideo();
        });
    }

    unpause() {
        this._player().then(player => {
            player.playVideo();
        });
    }

    _player() {
        if (this._playerReady == null) {
            this._playerReady = new Promise(resolve => {
                var player = new YT.Player('player', {
                    playerVars: {'controls': 2},
                    events: {
                        'onReady': event => {
                            resolve(player);
                        },
                        'onStateChange': event => {
                            switch (event.data) {
                                case YT.PlayerState.ENDED:
                                    PubSub.publish('video.state', 'ENDED');
                                    break;
                                case YT.PlayerState.PLAYING:
                                    PubSub.publish('video.state', 'PLAYING');
                                    break;
                                case YT.PlayerState.PAUSED:
                                    PubSub.publish('video.state', 'PAUSED');
                                    break;
                            }
                        }
                    }
                });
            });
        }

        return this._playerReady;
    }

}
