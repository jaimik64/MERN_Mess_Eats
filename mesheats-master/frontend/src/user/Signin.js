import React, { useState, useRef } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { signin, authenticate, isAuthenticated } from "../Auth/helper";
import { Form, Row, Col, Button, InputGroup, Nav } from "react-bootstrap";
import ReactPasswordToggleIcon from 'react-password-toggle-icon'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Signin = () => {

    const [values, setValues] = useState({
        email: "20bce506@nirmauni.ac.in",
        password: "123456789",
        showPassword: false,
        error: "",
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated()


    const handleChange = name => event => {

        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                    toast(data.error)
                } else {
                    toast("Signed In Successfully!!")
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(console.log("Sign in Request Failed"))


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
        let inputRef = useRef();

        const showIcon = () => <FaEye />
        const hideIcon = () => <FaEyeSlash />

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

                            <Form.Label className="mt-2">Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    style={style}
                                    ref={inputRef}
                                    type="password"
                                    onChange={handleChange("password")}
                                    value={password}
                                    placeholder="Password"
                                />
                                <ReactPasswordToggleIcon
                                    inputRef={inputRef}
                                    showIcon={showIcon}
                                    hideIcon={hideIcon}
                                />

                            </InputGroup>


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

export default Signin
