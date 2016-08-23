import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {render} from "react-dom";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import PlayerPanel from "./player_panel.jsx";
import reducer from "../reducers";

let preloadedState = {};
if (localStorage.selectedHandle !== undefined) {
    preloadedState.nowPlaying = {handle: localStorage.selectedHandle};
}


const enhancers = compose(applyMiddleware(thunk, createLogger()), window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = createStore(reducer, preloadedState, enhancers);

let currentHandle;
store.subscribe(() => {
    let previousHandle = currentHandle;
    const state = store.getState();
    currentHandle = state.nowPlaying.handle;

    if (previousHandle !== currentHandle) {
        console.log(`Saving [${currentHandle}] to localStorage...`);
        localStorage.selectedHandle = currentHandle;
    }
});

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <PlayerPanel />
            </Provider>
        );
    }
}
