import "./App.scss";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoItem from "./components/TodoItem/TodoItem";

import { useId } from "react";
import { useAppSelector } from "./hook";

const App: React.FC = () => {
    const id = useId();
    const { todos } = useAppSelector((state) => state.todos);
    return (
        <>
            <div className="header">todos</div>
            <div className="todo-wrapper">
                <TodoInput />
                {todos.map((todo) => {
                    return (
                        <TodoItem
                            key={id}
                            id={todo.id}
                            text={todo.text}
                            completed={todo.completed}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default App;
