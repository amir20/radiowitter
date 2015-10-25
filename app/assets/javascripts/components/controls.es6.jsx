class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: false};
    }

    componentDidMount() {
        PubSub.subscribe('video.state', data => {
            this.setState({playing: data == 'PLAYING'});
        });
    }

    render() {
        var mainButton = null;

        if (this.state.playing) {
            mainButton = <a className="glyphicon glyphicon-pause" onClick={() => this.props.player.pause()}></a>;
        } else {
            mainButton = <a className="glyphicon glyphicon-play" onClick={() => this.props.player.unpause()}></a>;
        }

        return (
            <ul className="list-inline controls">
                <li>
                    {mainButton}
                </li>
                <li>
                    { this.props.queue.size > 0 ? <a className="glyphicon glyphicon-forward" onClick={this.props.onNext}></a> : '' }
                </li>
            </ul>
        )
    }
}
