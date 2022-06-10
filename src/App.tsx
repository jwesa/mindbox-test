import "./App.scss";
import TodoFooter from "./components/TodoFooter/TodoFooter";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hook";
import {
    showActive,
    showCompleted,
    clearCompleted,
} from "./app/reducers/todoReducer";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { todos, activeTodos, completedTodos } = useAppSelector(
        (state) => state.todos
    );

    const activeItems = todos.filter((todo) => todo.completed === false);
    const [list, setList] = useState(todos);

    // С каждым диспатчем мы меняем нужный нам массив, соответственно обновляем лист, который будет рендерить компонент TodoList
    useEffect(() => {
        setList(todos);
    }, [todos]);

    useEffect(() => {
        setList(activeTodos);
    }, [activeTodos]);

    useEffect(() => {
        setList(completedTodos);
    }, [completedTodos]);

    return (
        <>
            <header className="header__title">todos</header>
            <div className="content-wrapper">
                <TodoInput />
                <TodoList todos={list} />
                {todos.length !== 0 && (
                    <TodoFooter
                        itemsCount={activeItems.length}
                        showAll={() => setList(todos)}
                        showActive={() => {
                            dispatch(showActive());
                        }}
                        showCompleted={() => {
                            dispatch(showCompleted());
                        }}
                        clearCompleted={() => {
                            dispatch(clearCompleted());
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default App;
