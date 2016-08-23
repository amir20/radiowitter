import {combineReducers} from "redux";
import history from "./history";
import nowPlaying from "./now_playing"
import playerStatus from "./player_status"

export default combineReducers({
    history,
    nowPlaying,
    playerStatus
});

