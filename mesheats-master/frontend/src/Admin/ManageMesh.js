import React, { useState, useEffect } from 'react';
import Base from '../core/Base'
import { getAllMeshUsers, removeMesh } from './helper/adminapicall';
import { Nav } from "react-bootstrap";

import { isAuthenticated } from '../Auth/helper';
import AdminLeftFixPanel from '../components/AdminLeftFixPanel';
import AdminLoader from '../components/AdminLoader';
import MTable from '../components/MTable';

const ManageMesh = () => {

    const [meshes, setMeshes] = useState([])
    const [error, setError] = useState(false)
    const { user, token } = isAuthenticated();
    const [isLoading, setIsLoading] = useState(true);

    const loadAllMeshes = () => {
        getAllMeshUsers(user._id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setMeshes(data)
                }
                setTimeout(() => { setIsLoading(false) }, 1000)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadAllMeshes();
    }, [])


    const removeMeshDetails = (userData) => {
        setIsLoading(true)

        if (userData._id === user._id) {
            alert("You can not remove an Admin!!!")
            setIsLoading(false)
        } else {

            removeMesh(token, user._id, userData._id)
                .then(data => {
                    if (data.error) {
                        setError(data.error)
                    }
                    window.location.reload()
                })

        }

    }


    const tableData = () => {

        const cols = [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Mobile', field: 'mobile' },
            { title: 'Location', field: 'location' },
            { title: 'City', field: 'city' },
            { title: 'Provide Delivery', field: 'delivery', lookup: { true: "Yes", false: "No" } },
            { title: 'Overall Feedback', field: 'overAllFeedback' },
        ]

        const data = meshes.map((mesh) => { return mesh })

        const actions = [rowData => (
            {
                icon: 'delete',
                tooltip: 'Delete Mesh',
                onClick: () => removeMeshDetails(rowData),
                disabled: rowData.Role == "Admin"
            }
        )]

        const editable = {
            onRowDelete: oldData => { removeMeshDetails(oldData) }
        }


        return (
            <MTable cols={cols} data={data} title="Registered Mess Details" editable={editable} />
        )
    }

    return (
        <Base>
            <div className='row mt-5'>
                <div className='col-4'>
                    <AdminLeftFixPanel style="side" />
                </div>
                <div className='col-8 tb'>
                    {isLoading ? <AdminLoader /> : tableData()}
                </div>
            </div>
        </Base>
    )
}

export default ManageMesh;