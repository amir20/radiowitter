import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Controls from "./controls.jsx";
import NowPlaying from "./now_playing.jsx";
import Player from "./Player.jsx";
import History from "./history.jsx";
import * as actions from "../actions";


@connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actions, dispatch)})
)
export default class PlayerPanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (localStorage.selectedHandle !== undefined) {
            this.props.actions.updateHandle(localStorage.selectedHandle);
        } else {
            this.controls.showStations();
        }
    }

    render() {
        const {history, nowPlaying, actions, playerStatus} = this.props;
        return (
            <div>
                <Player nowPlaying={nowPlaying} actions={actions} ref={r => this.player = r}/>
                <section>
                    <Controls playerStatus={playerStatus}
                              nowPlaying={nowPlaying}
                              actions={actions}
                              player={this.player}
                              ref={r => this.controls = r}/>
                </section>
                <section>
                    <NowPlaying nowPlaying={nowPlaying}/>
                </section>
                <section>
                    <History history={history}/>
                </section>
            </div>
        )
    }
}


