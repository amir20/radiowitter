class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tweets: []};
        this._twitter = new Twitter();
    }

    componentDidMount() {
        this._twitter.nextTweet().then(tweet => {
                this.setState({tweets: [tweet]});
            }
        )
    }

    render() {
        return (
            <ul className="list-unstyled">
                {
                    this.state.tweets.map(function (tweet) {
                        return <li key={tweet.id}>{tweet.text}</li>
                    })
                }
            </ul>
        )
    }
}

