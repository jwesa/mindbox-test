import "./App.scss";
import TodoFooter from "./components/TodoFooter/TodoFooter";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";

import { useAppSelector, useAppDispatch } from "./hook";
import {
    showActive,
    showCompleted,
    clearCompleted,
    showAll,
} from "./app/reducers/todoReducer";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { todos, currentList } = useAppSelector((state) => state.todos);

    const activeItems = todos.filter((todo) => todo.completed === false);

    return (
        <>
            <header className="header__title">todos</header>
            <div className="content-wrapper">
                <TodoInput />
                <TodoList todos={currentList} />
                {todos.length !== 0 && (
                    <TodoFooter
                        itemsCount={activeItems.length}
                        showAll={() => {
                            dispatch(showAll());
                        }}
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
