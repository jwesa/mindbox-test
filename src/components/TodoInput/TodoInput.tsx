import "./TodoInput.scss";
import { useAppDispatch } from "../../hook";
import { useState } from "react";
import { addTodo } from "../../app/reducers/todoReducer";

const TodoInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");

    return (
        <>
            <input
                type="text"
                className="todo-input"
                placeholder="What needs to be done?"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && value !== "") {
                        dispatch(addTodo(value));
                        setValue("");
                    }
                }}
            />
        </>
    );
};

export default TodoInput;
