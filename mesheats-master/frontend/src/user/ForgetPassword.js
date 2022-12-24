import React, { useState, useRef } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { isAuthenticated } from "../Auth/helper";
import { Form, Row, Col, Button, InputGroup, Nav } from "react-bootstrap";




const ForgetPassword = () => {
    const [values, setValues] = useState({
        email: "20bce506@nirmauni.ac.in",
        error: "",
        loading: false,
        didRedirect: false
    })


    const { email, loading, didRedirect, error } = values;
    const { user } = isAuthenticated()


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })


    }

    const loadingMessage = () => {
        return loading && toast("Loaddingg....", { position: "top-center", autoClose: 100, closeOnClick: true, pauseOnHover: false })
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to='/'></Redirect>
        }
    }

    const signInForm = () => {

        let style = { display: "block", width: "100%", border: "0px", borderBottom: "1px solid green", padding: "5px", outline: "none" }

        return (
            <div>
                <ToastContainer position="top-center" />
                <Row className="justify-content-between d-flex">
                    <Col md="6" >

                    </Col>
                    <Col md="6" xs={{ offset: 3 }} >
                        <Form className="signin p-4 shadow-lg rounded-xl shadow-slate-500">
                            <Form.Group className="inputs">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" style={style} onChange={handleChange("email")} value={email} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="success" type="submit" className="mt-4" onClick={onSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </Form>

                    </Col>
                </Row>
            </div>
        )
    }

    return (
        <Base title="Sign In Page" description="A page for User to Sign In">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default ForgetPassword;