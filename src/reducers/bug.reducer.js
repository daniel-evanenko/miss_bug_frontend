export const initialBugState = {
    bugs: [],
};

export function bugReducer(state, action) {
    switch (action.type) {
        case 'SET_BUGS':
            return { ...state, bugs: action.bugs };

        case 'ADD_BUG':
            return { ...state, bugs: [action.bug, ...state.bugs] };

        case 'UPDATE_BUG':
            return {
                ...state,
                bugs: state.bugs.map(bug =>
                    bug._id === action.bug._id ? action.bug : bug
                ),
            };

        case 'REMOVE_BUG':
            return {
                ...state,
                bugs: state.bugs.filter(bug => bug._id !== action.bugId),
            };

        default:
            return state;
    }
}
