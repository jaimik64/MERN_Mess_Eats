import React, { useState, useEffect } from 'react';
import Base from '../core/Base'
import { getAllUsers, removeUser, updateProfile } from './helper/adminapicall';
import { isAuthenticated } from '../Auth/helper';
import AdminLoader from '../components/AdminLoader'
import AdminLeftFixPanel from '../components/AdminLeftFixPanel';
import MTable from '../components/MTable';
import { ToastContainer, toast } from 'react-toastify'


const AllUsers = () => {

    const [users, setUsers] = useState([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const { user, token } = isAuthenticated();

    const loadAllUsers = () => {

        getAllUsers(user._id, token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setUsers(data)
            }
            setTimeout(() => { setIsLoading(false) }, 1000)
        })
    }

    useEffect(() => {
        loadAllUsers();
    }, [])


    const removeUserData = (userData) => {
        setIsLoading(true)

        if (userData._id === user._id) {
            toast("You can not remove an Admin!!!", { position: "top-center", autoClose: 1000, type: "success" })
            setIsLoading(false)
        } else {

            removeUser(token, user._id, userData._id)
                .then(data => {
                    if (data.error) {
                        setError(data.error)
                    }
                })
        }

        toast("User Removed !!!", { position: "top-center", autoClose: 1000 })
        window.location.reload()
    }

    const changeUserRole = (rowData) => {
        setIsLoading(true);

        if (user._id === rowData._id) {
            toast("Admin Can't Change role of yourself", { position: "top-center", autoClose: 1000 })
            setIsLoading(false)
        } else {
            let uData = { ...rowData };

            updateProfile(token, rowData._id, user._id, uData)
                .then(data => {
                    if (data.error)
                        setError(data.error)
                    toast("User Role Updated !!!", { position: "top-center", autoClose: 1000 })
                    loadAllUsers()
                })
        }
        window.location.reload();
        // loadAllUsers()
    }

    const userData = () => {

        const cols = [
            { title: 'Name', field: 'name', editable: 'never' },
            { title: 'Email Id', field: 'email', editable: 'never' },
            { title: 'Mobile Number', field: 'mobile', editable: 'never' },
            { title: 'Role', field: 'role', lookup: { "0": "User", "1": "Admin" } },
        ]

        const data = users.map((user, _id) => {
            return user;
        })

        const editable = {
            onRowDelete: oldData => { removeUserData(oldData) },
            onRowUpdate: newData => { changeUserRole(newData) }
        }

        return (
            <MTable cols={cols} data={data} title="Basic User Details" editable={editable} onPageChange={null} />
        )

    }


    return (
        <Base>
            <div className='row mt-5' disabled={isLoading}>
                <div className='col-4'>
                    <AdminLeftFixPanel style="side" />
                </div>
                <div className='col-8 tb'>
                    <ToastContainer />
                    {isLoading ? <AdminLoader /> : userData()}
                </div>
            </div>
        </Base>
    )
}

export default AllUsers;