import { createContext, useContext, useReducer } from 'react';
import { bugService } from '../services/bug.service';
import { bugReducer, initialBugState } from '../reducers/bug.reducer.js'

const BugContext = createContext();

export function BugProvider({ children }) {
    const [state, dispatch] = useReducer(bugReducer, initialBugState);

    async function loadBugs(filterBy) {
        const bugs = await bugService.query(filterBy);
        dispatch({ type: 'SET_BUGS', bugs });
    }

    async function addBug(bugData) {
        const bug = await bugService.save(bugData);
        dispatch({ type: 'ADD_BUG', bug });
        return bug;
    }

    async function updateBug(bugData) {
        const bug = await bugService.save(bugData);
        dispatch({ type: 'UPDATE_BUG', bug });
        return bug;
    }

    async function removeBug(bugId) {
        await bugService.remove(bugId);
        dispatch({ type: 'REMOVE_BUG', bugId });
    }

    return (
        <BugContext.Provider value={{
            bugs: state.bugs,
            loadBugs,
            addBug,
            updateBug,
            removeBug,
        }}>
            {children}
        </BugContext.Provider>
    );
}

export function useBug() {
    return useContext(BugContext);
}
