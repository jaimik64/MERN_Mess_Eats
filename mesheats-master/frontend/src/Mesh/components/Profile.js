import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth";
import { getUserDetail, updateProfile } from './apicall'
import Base from "../core/Base";
import { Redirect } from 'react-router-dom'
import { Col, Form, Row, Button } from "react-bootstrap";
import MeshLeftPanel from '../components/MeshLeftPanel'

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

                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const { email, mobile, name, city, location } = meshUser

    const handleChange = name => event => {
        setMeshUser({ ...meshUser, [name]: event.currentTarget.value })
    }

    const performRedirect = () => {
        if (success === true)
            return <Redirect to='/mesh' />

        if (isAuthenticated()) {
            return <Redirect to='/mesh/profile' />
        }
    }

    const onSubmit = event => {
        event.preventDefault()

        setError(false)
        setSuccess(false)
        setMeshUser({ ...meshUser, error: false, success: false })


        const updatedDetails = {
            name,
            location,
            city
        }

        updateProfile(user._id, token, updatedDetails)
            .then(data => {
                if (data.err) {
                    setError(data.err)
                    setSuccess(false)
                } else {
                    setError(false)
                    setSuccess(true)


                    if (success === true)
                        return <Redirect to='/mesh/profile' />
                    performRedirect()
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
                        Details Updated!!
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
                            <Form.Label>Mesh Location</Form.Label>
                            <Form.Control type="text" onChange={handleChange("location")} value={location} placeholder="Enter Location" />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onChange={handleChange("city")} value={city} placeholder="Enter City" />
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
                        {successMessage()}
                        {errorMessage()}
                        <div className="col-4">
                            <MeshLeftPanel style="side" />
                        </div>
                        <div className="col-8 tb">
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
