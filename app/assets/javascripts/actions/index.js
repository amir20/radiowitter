import Twitter from "../services/twitter";
import {findNextBestVideo} from "../services/twitter_video_service";

export const ADD_HISTORY = 'ADD_HISTORY';
export const NEXT_VIDEO = 'next_video';
export const PAUSE_VIDEO = 'pause_video';
export const RESUME_VIDEO = 'resume_video';
export const VIDEO_PAUSED = 'video_paused';
export const VIDEO_PLAYING = 'video_playing';
export const VIDEO_ENDED = 'video_ended';
export const NOW_PLAYING = 'now_playing';
export const FETCHING_VIDEO = 'fetching_video';
export const UPDATE_HANDLE = 'update_handle';


export function addHistory(item) {
    return {
        type: ADD_HISTORY,
        item
    }
}

export function fetchingVideo() {
    return {
        type: FETCHING_VIDEO
    }
}

export function playVideo(video) {
    return {
        type: NOW_PLAYING,
        video
    }
}

export function videoPaused() {
    return {
        type: VIDEO_PAUSED,
    }
}

export function videoPlaying() {
    return {
        type: VIDEO_PLAYING,
    }
}

export function newHandle(handle) {
    return {
        type: UPDATE_HANDLE,
        handle
    }
}

export function videoEnded() {
    return dispatch => {
        dispatch({type: VIDEO_ENDED});
        dispatch(playNext());
    }
}


let twitter;
export function updateHandle(handle) {
    twitter = new Twitter(handle);

    return dispatch => {
        dispatch(newHandle(handle));
        dispatch(playNext());
    }
}

export function playNext() {
    return (dispatch, getState) => {

        const {video, tweet} = getState().nowPlaying;

        if (video !== undefined) {
            dispatch(addHistory({video, tweet}));
        }

        dispatch(fetchingVideo());
        findNextBestVideo(twitter).then(video => dispatch(playVideo(video)));
    }
}
