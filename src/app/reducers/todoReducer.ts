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
    currentList: Todo[];
}

const initialState: TodoState = {
    todos: [],
    activeTodos: [],
    completedTodos: [],
    currentList: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            const newTodo = {
                id: uuid(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
			state.activeTodos.push(newTodo);
            state.currentList = state.todos;
        },
        setCompleted(state, action: PayloadAction<string>) {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            // Меняем completed на противоположное, добавляем в массив, который соответсвует этому свойству, из другого убираем
            if (todo?.completed === false) {
                todo.completed = !todo.completed;
                state.activeTodos = state.activeTodos.filter(
                    (item) => item.id !== todo.id
                );
                state.completedTodos.push(todo);
            } else {
                if (todo?.completed === true) {
                    todo.completed = !todo.completed;
                    state.completedTodos = state.completedTodos.filter(
                        (item) => item.id !== todo.id
                    );
                    state.activeTodos.push(todo);
                }
            }
            const currentTodo = state.currentList.find(
                (todo) => todo.id === action.payload
            );
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
            }
        },
        showAll(state) {
            state.currentList = state.todos;
        },
        showActive(state) {
            state.currentList = state.activeTodos;
        },
        showCompleted(state) {
            state.currentList = state.completedTodos;
        },
        clearCompleted(state) {
            state.completedTodos.length = 0;

            state.todos = state.todos.map((todo) => {
                return {
                    ...todo,
                    completed: false,
                };
            });

            state.activeTodos = [...state.todos];
            state.currentList = state.todos;
        },
    },
});

export const {
    addTodo,
    setCompleted,
    showAll,
    showActive,
    showCompleted,
    clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
