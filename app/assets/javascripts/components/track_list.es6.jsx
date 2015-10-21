class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tweets: Immutable.List()};
        this._twitter = new Twitter();
        this._youtube = new Youtube();
        this._player = new Player();
    }

    componentDidMount() {
        this._player.setEndedCallback(this.playNextMatch.bind(this));
        this.playNextMatch();
    }

    playNextMatch() {
        this._twitter.nextTweet().then(tweet => {
                this.setState({tweets: this.state.tweets.unshift(tweet)});
                this._youtube.findFirstMatch(tweet.text).then((video) => {
                    this._player.playVideo(video.id.videoId);
                });
            }
        )
    }

    render() {
        return (
            <ul className="list-unstyled">
                {
                    this.state.tweets.map(function (tweet) {
                        return <li key={tweet.id} dangerouslySetInnerHTML={{__html: tweet.text}}></li>
                    })
                }
            </ul>
        )
    }
}

