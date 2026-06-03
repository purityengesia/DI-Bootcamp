import { ADD_TASK, EDIT_TASK, DELETE_TASK, SET_DATE } from './taskActionTypes';

const initialState = {
  selectedDate: new Date().toISOString().split('T')[0], // Default to today
  tasks: {
    // Tasks will be stored like: { "2023-10-27": [ { id: 1, text: "..." } ] }
  },
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };

    case ADD_TASK:
      const { date, task } = action.payload;
      // Get existing tasks for the day or an empty array
      const currentTasks = state.tasks[date] || [];
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: [...currentTasks, task],
        },
      };

    case EDIT_TASK:
      const { date: eDate, id, newText } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [eDate]: state.tasks[eDate].map((task) =>
            task.id === id ? { ...task, text: newText } : task
          ),
        },
      };

    case DELETE_TASK:
      const { date: dDate, id: dId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [dDate]: state.tasks[dDate].filter((task) => task.id !== dId),
        },
      };

    default:
      return state;
  }
};

export default taskReducer;