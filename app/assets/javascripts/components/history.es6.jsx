class History extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.list.isEmpty()) {
            return false;
        }
        return (
            <div className="history">
                <h4>Play History</h4>
                <ul className="list-unstyled">
                    {
                        this.props.list.map(function (item) {
                            return (
                                <li className="media" key={item.tweet.id}>
                                    <div className="media-left">
                                        <img className="media-object thumbnail"
                                             src={item.video.snippet.thumbnails.default.url}/>
                                    </div>
                                    <div className="media-body">
                                        <div className="media-heading title">{item.video.snippet.title}</div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}
