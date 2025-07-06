import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginComponent() {
    const [password, setPassword] = useState("")
    const [showFailure, setFailure] = useState(false);
    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username;

    const handleUsernameChange = (event) => {
        authContext.setUsername(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    } 

    async function handleSubmission() {
        if (await authContext.login(username, password)) {
            setFailure(false);
            navigate(`/welcome/${username}`);
        } else {
            setFailure(true);
        }
    }

    return (
        <>
            <div className="login">
                <h1>Login</h1>
                {showFailure && <div className="statusMessage">Authentication failed. Please check your credentials.</div>}
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" className="btn btn-primary" onClick={handleSubmission}>login</button>
                </div>
            </div>
        </>
    )
}
