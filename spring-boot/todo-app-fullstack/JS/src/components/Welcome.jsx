import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export default function WelcomeComponent() {
    const {username} = useParams();
    const navigate = useNavigate();

    return (
        <>
            <div className="welcome">
                <h1>Welcome, {username}</h1>
                <button className="btn btn-primary m-5" onClick={() => navigate("/todos")}>Manage Your Todos</button>
            </div>
        </>
    )
}