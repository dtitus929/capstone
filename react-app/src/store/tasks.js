const GET_ALL_TASKS_BY_LIST = "tasks/GET_ALL_TASKS_BY_LIST ";
const NO_TASKS_FOUND = "tasks/NO_TASKS_FOUND ";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const allTasksByList = (tasks) => ({
    type: GET_ALL_TASKS_BY_LIST,
    payload: tasks,

});

const noTasksFound = () => ({
    type: NO_TASKS_FOUND,
});

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getListTasksThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/lists/${id}/tasks`);

    if (response.ok) {
        const data = await response.json();
        dispatch(allTasksByList(data));
    } else if (response.status === 404) {
        dispatch(noTasksFound());
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const initialState = { listTasks: {} };

export default function taskReducer(state = initialState, action) {

    // let newState;

    switch (action.type) {

        case GET_ALL_TASKS_BY_LIST:
            const listTasks = {};
            action.payload.tasks.forEach((task) => (listTasks[task.id] = task));
            return {
                ...state, listTasks: { ...listTasks }
            }

        case NO_TASKS_FOUND:
            return {
                ...state, listTasks: {}
            }


        // case EDIT_LIST:
        //     newState = { ...state }
        //     newState.allLists = { ...state.allLists };
        //     newState.allLists[action.payload.id] = action.payload;
        //     return newState;


        // case DELETE_LIST:
        //     newState = { ...state }
        //     newState.allLists = { ...state.allLists };
        //     delete newState.allLists[action.id];
        //     return newState;


        // case ADD_LIST:
        //     console.log('IN ADD_LIST');
        //     console.log('ThePayload is:', action.payload);
        //     newState = { ...state }
        //     newState.allLists = { ...state.allLists };
        //     newState.allLists[action.payload.id] = action.payload;
        //     return newState;

        default:
            return state;
    }
}
