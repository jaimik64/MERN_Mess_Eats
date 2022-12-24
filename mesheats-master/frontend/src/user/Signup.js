import React, { useState, useRef } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, signup } from "../Auth/helper";
import { Col, Form, Row, Button, InputGroup } from "react-bootstrap";
import PasswordStrengthBar from 'react-password-strength-bar'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import ReactPasswordToggleIcon from 'react-password-toggle-icon'
import { ToastContainer, toast } from 'react-toastify'



const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        mobile: "",
        rePass: ""
    })
    const [pass, setPass] = useState(false)
    const { name, email, password, error, rePass, success, mobile } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
        validateInput(event)
    }

    const validateInput = e => {
        const { name, value } = e.target

        switch (name) {
            case "password":
                if (rePass && value !== rePass)
                    setPass(false)
                else
                    setPass(true)
                break;
            case "rePass":
                if (password && value !== password)
                    setPass(false)
                else
                    setPass(true)
                break;
            default: break;
        }
    }

    const performRedirect = () => {
        // alert('Account Created Redirecting to Login Page')

        if (success === true) {
            return <Redirect to='/signin' />
        }

        if (isAuthenticated()) {
            return <Redirect to='/'></Redirect>
        }
    }

    const onSubmit = event => {
        event.preventDefault();
        // validate()
        if (password === rePass) {
            setValues({ ...values, error: false })

            signup({ name, email, password, mobile })
                .then(data => {
                    console.log(data);
                    if (data.err) {
                        setValues({
                            ...values, error: data.err, success: false
                        })
                        toast(data.err, { position: "top-center", type: "error" })
                    } else {
                        setValues({
                            ...values,
                            name: "",
                            email: "",
                            error: "",
                            password: "",
                            rePass: "",
                            mobile: "",
                            success: true
                        })
                        setPass(false)
                        if (success === true) {
                            return <Redirect to='/' />
                        }
                        toast("New Account Created Successfully!! Please Login", { position: 'top-center', type: 'success' })
                        performRedirect();
                    }
                })
                .catch(console.log("Error In Signup"))
        } else {

        }
    }

    const successMessage = () => {
        return (
            <div className="row mt-5" style={{ top: "50", marginBottom: "-5%" }}>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New Account Created Successfully!! Please <Link to='/signin'>Login</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>

                    <div className='alert alert-danger'
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        let inputRef = useRef();
        let passRef = useRef();

        const showIcon = () => <FaEye />
        const hideIcon = () => <FaEyeSlash />

        let style = { display: "block", width: "100%", border: "0px", borderBottom: "1px solid green", padding: "5px", outline: "none" }

        return (
            <Row className="mt-5">

                <Col md="6">

                </Col>
                <Col md="6" xs={{ offset: 3 }}>
                    <ToastContainer />
                    <Form className="signup p-4 shadow-lg rounded-xl shadow-slate-500">
                        <Form.Group className="my-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" style={style} onChange={handleChange("name")} value={name} placeholder='Enter Name ' />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" style={style} onChange={handleChange("email")} value={email} placeholder='Enter MailId ' />
                        </Form.Group>


                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={passRef}
                                style={style}
                                type="password"
                                onChange={handleChange("password")}
                                value={password}
                                placeholder='Enter Password '
                            />
                            <ReactPasswordToggleIcon
                                inputRef={passRef}
                                showIcon={showIcon}
                                hideIcon={hideIcon}
                            />
                        </InputGroup>
                        <PasswordStrengthBar className="mt-2" password={password} />

                        <Form.Label>Re-Enter Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                ref={inputRef}
                                style={style}
                                type="password"
                                name="rePass"
                                onChange={handleChange("rePass")}
                                value={rePass}
                                placeholder='Enter Same Password'
                            />
                            <ReactPasswordToggleIcon
                                inputRef={inputRef}
                                showIcon={showIcon}
                                hideIcon={hideIcon}
                            />
                        </InputGroup>
                        {
                            pass ?
                                <h4 className="text-success">
                                    Password Match!!
                                </h4>
                                :
                                <h4 className="text-danger">
                                    Password Not Same
                                </h4>
                        }
                        <Form.Group className="my-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="tel" style={style} onChange={handleChange("mobile")} value={mobile} placeholder='Enter Mobile No ' />
                        </Form.Group>

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
        <Base title="Sign Up Page" description="A Page for user to Signup" >
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>

    )
}


export default Signup;