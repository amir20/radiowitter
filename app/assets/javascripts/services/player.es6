class Player {
    constructor() {
        this._playerReady = null;
        this._onVideoEnded = () => {}
    }

    playVideo(videoId) {
        this._player().then((player) => {
            player.loadVideoById(videoId);
        });
    }

    setEndedCallback(cb) {
        this._onVideoEnded = cb
    }

    _player() {
        if (this._playerReady == null) {
            this._playerReady = new Promise((resolve) => {
                var player = new YT.Player('player', {
                    playerVars: {'controls': 2},
                    events: {
                        'onReady': (event) => {
                            resolve(player);
                        },
                        'onStateChange': (event) => {
                            if(event.data == YT.PlayerState.ENDED) {
                                console.log("Video ended...");
                                this._onVideoEnded();
                            }
                        }
                    }
                });
            });
        }

        return this._playerReady;
    }

}
