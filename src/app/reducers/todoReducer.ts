import { v4 as uuid } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    activeTodos: Todo[];
    completedTodos: Todo[];
}

const initialState: TodoState = {
    todos: [],
    activeTodos: [],
    completedTodos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: uuid(),
                text: action.payload,
                completed: false,
            });
        },
        setCompleted(state, action: PayloadAction<string>) {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        showActive(state) {
            state.activeTodos = state.todos.filter(
                (todo) => todo.completed === false
            );
        },
        showCompleted(state) {
            state.completedTodos = state.todos.filter(
                (todo) => todo.completed === true
            );
        },
        clearCompleted(state) {
            state.completedTodos.length = 0;
			state.todos = state.todos.map((todo) => {
				return {
					...todo,
					completed: false,
				}
			})
        },
    },
});

export const {
    addTodo,
    setCompleted,
    showActive,
    showCompleted,
    clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
