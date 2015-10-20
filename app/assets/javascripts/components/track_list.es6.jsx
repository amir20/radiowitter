class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tweets: []};
        this._twitter = new Twitter();
        this._youtube = new Youtube();
    }

    componentDidMount() {
        this._twitter.nextTweet().then(tweet => {
                this.setState({tweets: [tweet]});
                this._youtube.findFirstMatch(tweet.text).then((video) => {

                    var player = new YT.Player('player', {
                        playerVars: { 'autoplay': 1, 'controls': 0 },
                        videoId: video.id.videoId
                    });
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

