class PlayerPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {history: Immutable.List(), nowPlaying: null};
        this._twitter = new Twitter();
        this._youtube = new Youtube();
        this._player = new Player();
    }

    componentDidMount() {
        this.playNextMatch();
        PubSub.subscribe('video.state', data => {
            if(data == 'ENDED') {
                this.playNextMatch();
            }
        });
    }

    playNextMatch() {

        this._twitter.nextTweet().then(tweet => {
                if(tweet) {
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
                <Controls onNext={this.playNextMatch.bind(this)} queue={this._twitter.queuedTweets()} player={this._player}/>
                <NowPlaying data={this.state.nowPlaying}/>
                <History list={this.state.history}/>
            </div>
        )
    }
}
