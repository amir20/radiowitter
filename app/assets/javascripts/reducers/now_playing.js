import {NOW_PLAYING, UPDATE_HANDLE} from "../actions";

export default function nowPlaying(state = {}, action) {
    switch (action.type) {
        case NOW_PLAYING:
            const {video} = action;
            const tweet = video.tweet;
            return {
                ...state,
                video,
                tweet
            };

        case UPDATE_HANDLE:
            return {
                ...state,
                handle: action.handle
            };

        default:
            return state;
    }
}