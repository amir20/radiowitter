class PlayerPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {history: Immutable.List(), nowPlaying: null};
        this._twitter = new Twitter();
        this._youtube = new Youtube();
        this._player = new Player();
    }

    componentDidMount() {
        this._player.setEndedCallback(this.playNextMatch.bind(this));
        this.playNextMatch();
    }

    playNextMatch() {
        if (this.state.nowPlaying != null) {
            this.setState({history: this.state.history.unshift(this.state.nowPlaying)});
        }
        this._twitter.nextTweet().then(tweet => {
                this._youtube.findFirstMatch(tweet).then((video) => {
                    this._player.playVideo(video.id.videoId);
                    this.setState({nowPlaying: {tweet: tweet, video: video}});
                });
            }
        )
    }

    render() {
        return (
            <div>
                <NowPlaying data={this.state.nowPlaying}/>
                <History list={this.state.history}/>
            </div>
        )
    }
}
