import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import Immutable from "immutable";

jest.dontMock('../history');
const History = require('../history');

describe('History', () => {
    it('should tell use it is a demo component', () => {
        let historyComponent = TestUtils.renderIntoDocument(<History list={Immutable.List.of()}/>);
        let node = ReactDOM.findDOMNode(historyComponent);

        expect(node.textContent).toEqual('Play HistoryFirst song needs to finish before a history can be displayed.');
    });
});