import React, { useState, useEffect } from 'react'
import Base from './Base'
import { isAuthenticated } from "../Auth/helper";
import AdminLoader from "../components/AdminLoader";
import { getMeshDetailForHomePage } from "../user/User";
import MCard from '../components/MCard'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [meshes, setMeshes] = useState(null)


    const loadMeshes = () => {

        getMeshDetailForHomePage()
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
                    meshes ? meshes.map((mesh, id) => {
                        return (
                            <div key={id} className="col-4 mb-4">
                                <MCard mesh={mesh} />
                            </div>
                        )
                    }) : ""
                }
            </div>
        )
    }

    return (
        <Base title='Home Page' description='Welcome to the Home Page'>
            <div className='row mt-5'>
                <div className='col-2'></div>
                <div className='col-10 tb'>
                    {isLoading ? <AdminLoader /> : displayMeshCards()}
                </div>
            </div>
        </Base>
    )
}
