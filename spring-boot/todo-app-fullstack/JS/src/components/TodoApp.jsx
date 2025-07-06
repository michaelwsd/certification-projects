import LoginComponent from "./Login"
import WelcomeComponent from "./Welcome"
import ErrorComponent from "./Error"
import ListTodosComponent from "./ListTodos"
import HeaderComponent from "./Header"
import FooterComponent from "./Footer"
import LogoutComponent from "./Logout"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "../styles/TodoApp.css"
import {AuthProvider, useAuth} from "./AuthContext"
import TodoComponent from "./Todo"

export default function TodoApp() {
    return (
        <>
            <div className="todo-app">
                <AuthProvider>
                    <BrowserRouter>
                        <HeaderComponent />
                        <Routes>
                            <Route path="/" element={<LoginComponent />} />
                            <Route path="/login" element={<LoginComponent />} />

                            <Route path="/welcome/:username" element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute>
                                } />
                            <Route path="/todos" element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>
                                } />
                            <Route path="/logout" element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>
                                } />
                            <Route path="/todos/:id" element={
                                <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                                } />
                            
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                        <FooterComponent />
                    </BrowserRouter>
                </AuthProvider>
            </div>
        </>
    )
}

function AuthenticatedRoute({children}) {
    const authContext = useAuth();
    if (authContext.isAuthenticated) {
        return children;
    }

    return <Navigate to="/" />
}