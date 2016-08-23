import { ADD_HISTORY } from "../actions"

export default function history(state = [], action) {

    switch (action.type) {
        case ADD_HISTORY:
            return [
                action.item,
                ...state
            ];

        default:
            return state;

    }
}