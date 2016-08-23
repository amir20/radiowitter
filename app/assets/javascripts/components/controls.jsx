import React, {Component} from "react";
import {connect} from "react-redux";
import Modal from "react-bootstrap/lib/Modal";

const stations = [
    {
        handle: 'bpm_playlist',
        image: 'https://pbs.twimg.com/profile_images/528229203208966146/40XOYjyZ.jpeg',
        description: "BPM is America's Dance Hits Channel on @sxmElectro SiriusXM 51! Today's biggest dance hits, remixes, and more. You can find a history of all songs played here."
    },
    {
        handle: 'wknc881playlist',
        image: 'https://pbs.twimg.com/profile_images/3433875319/bf30b727b6a4fefa065df379a11f13ad.jpeg',
        description: "NOW PLAYING on WKNC 88.1 FM, N.C. State's student-run radio station for indie rock, electronic, metal and underground hip-hop."
    },
    {
        handle: 'area_playlist',
        image: 'https://pbs.twimg.com/profile_images/528230965265457152/kL8WGG_o.jpeg',
        description: "Electric Area is America's Dance Music/Mix Channel on @sxmElectro SiriusXM 52! House, Bigroom, Trance and more. You can find a history of all songs played here."
    },
    {
        handle: 'keepupdude',
        image: 'https://pbs.twimg.com/profile_images/481067300808687618/s7lx7LdY.jpeg',
        description: "Discover new and established artists new tracks and #FreeDownloads here!"
    },
    {
        handle: 'RapRadar',
        image: 'https://pbs.twimg.com/profile_images/762807090578685952/aNn7P_kY.jpg',
        description: "If It Happened In Hip-Hop, It's Here. The Official Twitter For Rap Radar."
    },
    {
        handle: 'kexpplaylist',
        image: 'https://pbs.twimg.com/profile_images/722839112256868352/pJtiivAh.jpg',
        description: "90.3 FM KEXP Seattle, WA - Where the Music Matters."
    },
    {
        handle: 'deepfmplaylist',
        image: 'https://pbs.twimg.com/profile_images/552558427906396160/poTx8O2Y.png',
        description: "DeepFM Playlist. We are Dance! Please also follow our main account @DeepFM."
    },
];

export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }


    changeStation(station) {
        this.setState({showModal: false});
        this.props.actions.updateHandle(station.handle);
    }

    showStations() {
        this.setState({showModal: true});
    }

    render() {
        const {playerStatus, nowPlaying} = this.props;
        let mainButton = playerStatus == 'playing' ?
            <a className="glyphicon glyphicon-pause" onClick={() => this.props.player.pause()}> </a> :
            <a className="glyphicon glyphicon-play" onClick={() => this.props.player.unpause()}> </a>;

        let buttons = playerStatus == 'loading' ?
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
                    <a className="glyphicon glyphicon-forward" onClick={() => this.props.actions.playNext()}> </a>
                </li>
            </ul>;

        return (
            <div className="title-bar">
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
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
                            <span className="default">playing @{nowPlaying.handle}</span>
                            <span className="over">Change Station</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


