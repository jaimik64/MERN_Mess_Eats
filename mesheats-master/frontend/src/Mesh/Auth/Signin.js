import React, { useState, useRef } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { authenticate, isAuthenticated } from "../Auth";
import { meshSignIn } from "./index";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import ReactPasswordToggleIcon from 'react-password-toggle-icon'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {

    const [values, setValues] = useState({
        email: "jaimikchauhan10@gmail.com",
        password: "123456789",
        error: "",
        loading: false,
        didRedirect: false
    })


    const { email, password, error, loading, didRedirect } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.values })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })

        const user = { email, password }

        meshSignIn(user)
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })

    }

    const loadingMessage = () => {
        const notify = () => toast("Loading.....");

        return (
            notify() &&
            loading && (
                <div className="alert alert-info">
                    <h2> Loading....</h2>
                    <ToastContainer />

                </div>
            )
        )
    }

    const errorMessage = () => {

        return error ? (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                        <ToastContainer />

                    </div>
                </div>
            </div>
        ) : null;
    }

    const performRedirect = () => {
        if (didRedirect) {
            return <Redirect to="/mesh" />
        }

        if (isAuthenticated()) {
            return <Redirect to='/mesh'></Redirect>
        }
    }

    const signInForm = () => {
        const passRef = useRef()
        const showIcon = () => <FaEye />
        const hideIcon = () => <FaEyeSlash />

        let style = { display: "block", width: "100%", border: "0px", borderBottom: "1px solid green", padding: "5px", outline: "none" }


        return (
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

                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                style={style}
                                ref={passRef}
                                onChange={handleChange("password")}
                                value={password}
                                placeholder="Password"
                            />
                            <ReactPasswordToggleIcon
                                inputRef={passRef}
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
        )
    }

    return (
        <Base title="Sign In Page" description="A page for User to Sign In">
            {signInForm()}
            {setTimeout(() => loadingMessage(), 1000)}
            {setTimeout(() => errorMessage(), 1000)}
            {performRedirect()}
        </Base>
    )
}

export default Signin