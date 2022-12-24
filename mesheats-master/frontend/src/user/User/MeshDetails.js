import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import UserPanel from '../../components/UserPanel'
import { isAuthenticated } from "../../Auth/helper";
import AdminLoader from "../../components/AdminLoader";
import { getMeshes } from ".";
import MCard from '../../components/MCard'

const ManageAddresses = () => {

    const { user, token } = isAuthenticated()
    const [isLoading, setIsLoading] = useState(true)
    const [meshes, setMeshes] = useState(null)
    const [error, setError] = useState("")

    const loadMeshes = () => {
        getMeshes(user._id, token)
            .then(data => {
                if (data.err)
                    return data.err
                setMeshes(data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        loadMeshes()
    }, [])

    const displayMeshCards = () => {
        return (
            <div className="row">
                {
                    meshes.map((mesh, id) => {
                        return (
                            <div key={id} className="col-4 mb-4">
                                <MCard mesh={mesh} />
                            </div>
                        )
                    })
                }
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
                            {isLoading ? <AdminLoader /> : displayMeshCards()}
                        </div>
                    </div>
                    : ""
            }
        </Base>
    )
}

export default ManageAddresses