import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import History from "../history.jsx"

describe('History', () => {
    it('should tell use it is a demo component', () => {
        let historyComponent = TestUtils.renderIntoDocument(<History history={[]}/>);
        let node = ReactDOM.findDOMNode(historyComponent);

        expect(node.textContent).toEqual('Play HistoryFirst song needs to finish before a history can be displayed.');
    });
});