import React, { useState, useEffect } from 'react'
import { isAuthenticated } from "../../../Auth/helper";
import { getMeshes, getDishesByMeshID } from "../index";
import MCardSubs from '../../../components/MCardSubs';
import { Form, Button, DropdownButton, Dropdown, Col, Row } from 'react-bootstrap'

// select Mesh component
const StepOne = ({ nextStep, handleFormData, values }) => {

    const { user, token } = isAuthenticated()
    const [error, setError] = useState(false)
    const [meshes, setMeshes] = useState([])
    const [mesh, setMesh] = useState("")
    const [dish, setDish] = useState("")
    const [dishes, setDishes] = useState([])

    const loadMeshes = () => {
        getMeshes(user._id, token)
            .then(data => {
                if (data.err)
                    return data.err
                setMeshes(data)
                // console.log(data)
            })
    }

    const loadDish = () => {
        getDishesByMeshID(user._id, mesh, token)
            .then(data => {
                if (data.error)
                    return data.error
                setDishes(data)
            })
    }

    useEffect(() => {
        loadMeshes()
        loadDish()
    }, [mesh])

    const handleMessChange = (e) => {
        setMesh(e)
    }

    const handleDishChange = (e) => {
        setDish(e)
    }

    const loadAndSelectMesh = () => {
        const title = mesh === "" ? "Select Mess" : "Selected";

        return (
            <DropdownButton onSelect={handleMessChange} title={title}>
                {
                    meshes.map((data, id) => {
                        return (
                            <Dropdown.Item key={id} eventKey={data._id}>
                                <p><b style={{ marginRight: "1rem" }}>{data.name}</b>{data.mobile}</p>
                                <p>{data.location}, {data.city}</p>
                            </Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>
        )
    }

    const loadAndSelectDish = () => {
        const title = dish === "" ? "Select Dish" : "Selected";

        return (
            <DropdownButton onSelect={handleDishChange} title={title}>
                {
                    dishes.map((data, id) => {
                        return (
                            <Dropdown.Item key={id} eventKey={data._id}>

                            </Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>
        )
    }

    return (
        <div>
            <Row>
                <Col>
                    Select Mess : {loadAndSelectMesh()}
                </Col>
                <Col>
                    {
                        mesh === "" ? "" : loadAndSelectDish()
                    }
                </Col>
            </Row>
        </div>

    )
}

export default StepOne