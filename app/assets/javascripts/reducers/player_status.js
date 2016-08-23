import {VIDEO_PLAYING, VIDEO_PAUSED, FETCHING_VIDEO} from "../actions";

export default function status(state = {}, action) {
    switch (action.type) {
        case FETCHING_VIDEO:
            return 'loading';

        case VIDEO_PLAYING:
            return 'playing';

        case VIDEO_PAUSED:
            return 'paused';

        default:
            return state;
    }
}