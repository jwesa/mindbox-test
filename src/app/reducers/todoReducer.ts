import { v4 as uuid } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type TodoState = {
    todos: Todo[];
};

const initialState: TodoState = {
    todos: [],
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
    },
});

export const { addTodo, setCompleted } = todoSlice.actions;

export default todoSlice.reducer;
