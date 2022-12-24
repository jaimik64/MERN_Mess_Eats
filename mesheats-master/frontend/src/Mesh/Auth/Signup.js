import React, { useState, useRef } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../Auth/helper";
import { meshSignUp } from ".";
import { Col, Form, Row, Button, DropdownButton, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import PasswordStrengthBar from 'react-password-strength-bar'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import ReactPasswordToggleIcon from 'react-password-toggle-icon'


const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        location: "",
        city: "",
        rePass: "",
        delivery: false,
        success: false,
        mobile: ""
    })
    const [pass, setPass] = useState(false)

    const { name, email, password, error, success, mobile, rePass, delivery, city, location } = values;


    const handleSelect = e => {
        setValues({ ...values, delivery: e })
    }

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
        validateInput(name, event.target.value)
    }

    const validateInput = (name, value) => {

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
            return <Redirect to='/mesh/auth/signin' />
        }

        if (isAuthenticated()) {
            return <Redirect to='/mesh'></Redirect>
        }
    }

    const onSubmit = event => {

        event.preventDefault();
        setValues({ ...values, error: false, success: false })

        meshSignUp({ name, email, password, mobile, delivery, city, location })
            .then(data => {
                if (data.err) {
                    // let dataErr = ""
                    // if (data.err.keyPattern.email === 1) {
                    //     dataErr = "Email Id Already Exist"
                    // }
                    // data.err = dataErr !== "" ? dataErr : data.err;
                    setValues({
                        ...values, error: data.err, success: false
                    })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        error: "",
                        password: "",
                        mobile: "",
                        rePass: "",
                        city: "",
                        location: "",
                        delivery: false,
                        success: true
                    })
                    if (success === true) {
                        return <Redirect to='/mesh/auth/signin' />
                    }
                    performRedirect();
                }
            })
    }

    const successMessage = () => {
        return (
            <div className="row mt-5">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New Account Created Successfully!! Please <Link to='/mesh/auth/signin'>Login</Link>
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

        const passRef = useRef()
        const rePassRef = useRef()

        const showIcon = () => <FaEye />
        const hideIcon = () => <FaEyeSlash />

        let style = { display: "block", width: "100%", border: "0px", borderBottom: "1px solid green", padding: "5px", outline: "none" }

        return (
            <Row>
                <Col md="6">

                </Col>
                <Col md="6" xs={{ offset: 3 }}>
                    <Form className="m-signup p-4 shadow-lg rounded-xl shadow-slate-500">
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
                                type="password"
                                ref={passRef}
                                style={style}
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

                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                ref={rePassRef}
                                style={style}
                                onChange={handleChange("rePass")}
                                value={rePass}
                                placeholder='Enter Password '
                            />
                            <ReactPasswordToggleIcon
                                inputRef={rePassRef}
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
                        <Form.Group className="my-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" style={style} onChange={handleChange("city")} value={city} placeholder="Enter City" />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" style={style} onChange={handleChange("location")} value={location} placeholder="Enter Address" />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <DropdownButton title="Provide Delivery ?" onSelect={handleSelect} >
                                <DropdownItem header></DropdownItem>
                                <DropdownItem eventKey="true">Yes</DropdownItem>
                                <DropdownItem eventKey="false">No</DropdownItem>
                            </DropdownButton>
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
        <Base title="Sign Up Page" description="A Page for user to Signup">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {/*<p className="text-black text-center">
                {JSON.stringify(values)}
    </p>*/}
        </Base>

    )
}


export default Signup;