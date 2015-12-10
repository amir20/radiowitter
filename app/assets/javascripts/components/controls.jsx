import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Modal from 'react-bootstrap/lib/Modal'

const stations = [
    {
        handle: 'bpm_playlist',
        image: 'https://pbs.twimg.com/profile_images/528229203208966146/40XOYjyZ.jpeg',
        description: "BPM is America's Dance Hits Channel on @sxmElectro SiriusXM 51! Today's biggest dance hits, remixes, and more. You can find a history of all songs played here."
    },
    {
        handle: 'Beats1Plays',
        image: 'https://pbs.twimg.com/profile_images/636221567563792384/JffTmAx_.jpg',
        description: "Live tweeting what is being played on @Beats1 - By @callumj for #Beats1"
    },
    {
        handle: 'SpotifyNowPlay',
        image: 'https://pbs.twimg.com/profile_images/1916496228/spotify1.jpg',
        description: "A Twitter account grouping all #NowPlaying hashtags on music platform @Spotify."
    },
    {
        handle: 'RapRadar',
        image: 'https://pbs.twimg.com/profile_images/2312907258/0591AB3A-6FAB-43B1-B532-CB019DFCC7DB',
        description: "If It Happened In Hip-Hop, It's Here. The Official Twitter For Rap Radar."
    },
];

export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {playing: false, showModal: false, selectedStation: {handle: 'music'}};
    }

    componentDidMount() {
        PubSub.subscribe('video.state', (msg, data) => {
            this.setState({playing: data == 'PLAYING'});
        });
    }

    changeStation(station) {
        this.setState({showModal: false, selectedStation: station});
        this.props.onStationChange(station);
        localStorage.selectedStation = station.handle;
    }

    showStations() {
        this.setState({showModal: true});
    }

    initStations() {
        if (localStorage.selectedStation) {
            let station = stations.find(station => station.handle == localStorage.selectedStation);
            this.changeStation(station);
        } else {
            this.showStations();
        }
    }


    render() {
        let mainButton = this.state.playing ?
            <a className="glyphicon glyphicon-pause" onClick={() => this.props.player.pause()}> </a> :
            <a className="glyphicon glyphicon-play" onClick={() => this.props.player.unpause()}> </a>;

        let buttons = this.props.loading ?
            <div className="loader-inner ball-pulse">
                <div></div>
                <div></div>
                <div></div>
            </div> :
            <ul className="list-inline controls">
                <li>
                    {mainButton}
                </li>
                <li>
                    <a className="glyphicon glyphicon-forward" onClick={this.props.onNext}> </a>
                </li>
            </ul>;

        return (
            <div className="title-bar">
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose a Twitter Handle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="stations list-unstyled">
                            {
                                stations.map(station => {

                                    return (
                                        <li className="media station" key={station.handle}
                                            onClick={() => this.changeStation(station)}>
                                            <div className="media-left">
                                                <img className="media-object thumbnail" src={station.image}/>
                                            </div>
                                            <div className="media-body">
                                                <h5 className="media-heading title">@{station.handle}</h5>
                                                <div className="media-heading description">{station.description}</div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </Modal.Body>
                </Modal>

                <div className="row">
                    <div className="col-md-4">
                        {buttons}
                    </div>

                    <div className="col-md-8">
                        <button className="change-station btn btn-sm btn-raised btn-primary"
                                type="button"
                                onClick={() => this.showStations()}>
                            <span className="default">playing @{this.state.selectedStation.handle}</span>
                            <span className="over">Change Station</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
