import { useNavigate, useParams } from "react-router-dom"
import { addTodo, retrieveTodoWithId, updateTodo } from "../api/TodoService";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

export default function TodoComponent() {
    const {id} = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState("")

    useEffect(() => retrieveTodo(), [])

    const retrieveTodo = () => {
        if (id != -1) {
            retrieveTodoWithId(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(err => console.log(err))
        }
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleTargetDate = (event) => {
        setTargetDate(event.target.value);
    }

    // only called if valid
    const submitTodo = (values) => { // values are automatically provided by formik
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if (id != -1) {
            // updates values in the database, values in list todos will be updated after re-rendering
            updateTodo(username, id, todo)
            .then(response => {
                navigate("/todos");
            })
            .catch(err => console.log(err));
        } else {
            addTodo(username, todo)
            .then(response => {
                navigate("/todos");
            })
            .catch(err => console.log(err));
        }
    }

    const validateTodo = (values) => { 
        let errors = {}
     
        if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters."
        }
        
        if (values.targetDate == null || values.targetDate == "" || !moment(values.targetDate).isValid()) {
            errors.targetDate = "Please enter a valid date."
        }

        return errors;
    }
    
    return (
        <>
            <div className="container">
                <h1>Enter Todo Details</h1>
                <div>
                    <Formik initialValues={{description, targetDate}} enableReinitialize = {true} onSubmit={submitTodo} validate={validateTodo} validateOnChange={false} validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" onChange={handleDescription} value={description} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate" onChange={handleTargetDate} value={targetDate} />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                    </Formik>
                </div>
            </div>
        </>
    )
} 