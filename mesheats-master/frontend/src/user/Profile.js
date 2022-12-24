import React, { useState, useEffect } from "react";
import '../Styles.css'
import { getUserDetail, updateProfile, isAuthenticated } from '../Auth/helper'
import Base from "../core/Base";
import { Redirect } from 'react-router-dom'
import { Col, Form, Row, Button } from "react-bootstrap";
import AdminLeftFixPanel from "../components/AdminLeftFixPanel";
import UserPanel from '../components/UserPanel'
import { ToastContainer, toast } from 'react-toastify'


const Profile = () => {

    const { user, token } = isAuthenticated();
    const [meshUser, setMeshUser] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)


    const getUserDetails = () => {
        getUserDetail(user._id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setMeshUser(data)
                    console.log(data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const { email, mobile, name } = meshUser

    const handleChange = name => event => {
        setMeshUser({ ...meshUser, [name]: event.currentTarget.value })
    }

    const onSubmit = event => {
        event.preventDefault()

        setError("")
        setSuccess(false)
        setMeshUser({ ...meshUser, error: false, success: false })


        const updatedDetails = { name }

        updateProfile(user._id, token, updatedDetails)
            .then(data => {
                if (data.err) {
                    setError(data.err)
                    toast("Error Occured : " + data.err, { position: "top-center", autoClose: 2000, type: "warning" })
                    setSuccess(false)
                } else {
                    setError("")
                    setSuccess(true)

                    toast('Profile Updated!!!', { position: "top-center", autoClose: 2000, type: "success" })

                    if (success === true)
                        return <Redirect to='/profile' />

                    if (isAuthenticated()) {
                        return <Redirect to='/profile' />
                    } else {
                        return <Redirect to='/' />
                    }
                }
            })

    }


    const updateForm = () => {
        return (
            <Row>
                <Col md='6'>
                </Col>
                <Col md="6" xs={{ offset: 3 }}>
                    <Form className="m-signup p-4 shadow-lg rounded-xl shadow-slate-500">
                        <Form.Group className="my-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" onChange={handleChange("name")} value={name} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control type="text" value={email} readOnly />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" value={mobile} readOnly />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="success" type="submit" className="mt-4" onClick={onSubmit} >
                                Update Details
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        )
    }

    return (
        <Base>
            {
                user ?

                    <div className="row mt-5">
                        <div className="col-4">

                            {
                                user.role === 1 ?
                                    (
                                        <AdminLeftFixPanel style="side" />
                                    )
                                    :
                                    (
                                        <UserPanel style="side" />
                                    )
                            } </div>

                        <div className="col-8 tb">

                            <ToastContainer />
                            <h2 className="text-center"> Update Profile </h2>
                            {updateForm()}
                        </div>
                    </div>
                    :
                    ""
            }

        </Base>
    )
}

export default Profile
