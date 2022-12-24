import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import AdminLoader from "../../components/AdminLoader";
import { isAuthenticated } from "../../Auth/helper";
import UserPanel from '../../components/UserPanel'
import { getDishesByMeshID, getSpecificMeshDetail } from ".";
import { Link } from "react-router-dom";
import DishCard from '../../components/DishCard'
import Card from 'react-bootstrap/Card'
import { MdShareLocation } from 'react-icons/md'
import { IoMdCall, IoMdMail } from "react-icons/io";


const Dishes = ({ match }) => {
    const { user, token } = isAuthenticated()
    const [isLoading, setIsLoading] = useState(false)
    const [dishes, setDishes] = useState([])
    const [error, setError] = useState("")
    const [mesh, setMesh] = useState({})
    const [reload, setReload] = useState(false);


    const getDishDetails = () => {
        getDishesByMeshID(user._id, match.params.meshId, token)
            .then(data => {
                if (data.err)
                    setError(data.err)
                else
                    setDishes(data)
            })
    }

    const getMeshDetail = () => {
        getSpecificMeshDetail(user._id, match.params.meshId, token)
            .then(data => {
                if (data.err)
                    setError(data.err)
                else
                    setMesh(data)
            })
    }

    useEffect(() => {
        getMeshDetail()
        getDishDetails()
    }, [reload])

    const dishDetails = () => {
        const meshTitle = mesh ? mesh.name : "Mesh Name Here"

        return (
            <div>
                <Link to='/user/meshDetails' style={{ marginBottom: "1rem" }}> {'<<<<'} Back  </Link>
                <hr />
                <Card style={{ padding: "0%", borderRadius: "0%", margin: "2% 0", color: "white" }} bg="dark" className="text-center">
                    <Card.Header style={{ borderBottom: "thick double #32a1ce" }}>Mesh </Card.Header>
                    <Card.Body>
                        <Card.Title style={{ textUnderlineOffset: true }}>{meshTitle}</Card.Title>
                        <Card.Text>
                            <MdShareLocation size='2rem' /> {mesh.location}, {mesh.city}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ borderTop: "thick double #32a1ce" }}>
                        <span style={{ marginRight: "2rem" }}><IoMdCall size="2rem" /> +91 {mesh.mobile} </span>
                        <IoMdMail size="2rem" /> {mesh.email}
                    </Card.Footer>
                </Card>

                <div className="row">
                    {
                        dishes.map((dish, id) => {
                            return (
                                <div key={id} className="col-4 mb-4">
                                    <DishCard
                                        dish={dish}
                                        addtoCart={true}
                                        removeFromCart={false}
                                        setReload={setReload}
                                        reload={reload}
                                        quantityVisible={false}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <Base>
            {
                user ?
                    <div className='row mt-5'>
                        <div className='col-4'>
                            <UserPanel style="side" />
                        </div>
                        <div className='col-8 tb'>
                            {isLoading ? <AdminLoader /> : dishDetails()}
                        </div>
                    </div>
                    : ""
            }
        </Base>
    )
}

export default Dishes