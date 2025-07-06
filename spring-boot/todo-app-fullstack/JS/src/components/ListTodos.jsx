import { useEffect, useState } from "react"
import { deleteTodoWithId, retrieveTodosWithUsername } from "../api/TodoService"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
    const [todos, setTodos] = useState([])
    const authContext = useAuth();
    const username = authContext.username; 
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => refreshTodos(), []);

    const refreshTodos = () => {
        retrieveTodosWithUsername(username)
        .then(newTodos => setTodos(newTodos.data))
        .catch(err => console.log(err));
    }

    const deleteTodo = (id) => {
        deleteTodoWithId(username, id)
        .then(() => {
            setMessage(`Deleted todo with ID ${id} successfully.`)
            refreshTodos();
        })
        .catch(err => console.log(err))
    }

    const updateTodo = (id) => {
        navigate(`/todos/${id}`);
    }

    const addNewTodo = () => {
        navigate(`/todos/-1`);
    }

    return (
        <>
            <div className="container">
                <h1>Todos Collection</h1>
                {message && <div className="alert alert-warning">{message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className="btn btn-success" onClick={addNewTodo}>Add New Todo</div>
            </div>
        </>
    )
}