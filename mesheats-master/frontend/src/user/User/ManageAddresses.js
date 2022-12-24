import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import UserPanel from '../../components/UserPanel'
import { isAuthenticated } from "../../Auth/helper";
import AdminLoader from "../../components/AdminLoader";
import { getAddresses, addAddress, updateAddress, removeAddress } from ".";
import MTable from "../../components/MTable";

const ManageAddresses = () => {

    const { user, token } = isAuthenticated()
    const [isLoading, setIsLoading] = useState(true)
    const [addresses, setAddresses] = useState(null)
    const [error, setError] = useState("")

    const loadAddresses = () => {

        getAddresses(user._id, token)
            .then(data => {
                if (data.err)
                    return data.err

                setAddresses(data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        loadAddresses()
    }, [])

    const editAddress = (address) => {

        address.user = user._id

        updateAddress(user._id, token, address, address._id)
            .then(data => {
                if (data.error)
                    setError(data.error)
                window.location.reload()

            })
    }

    const deleteAddress = (address) => {

        removeAddress(user._id, token, address._id)
            .then(data => {
                if (data.err)
                    setError(data.err)
                window.location.reload()

            })

    }

    const createAddress = (address) => {

        const add = { ...address, user: user._id }

        addAddress(user._id, token, add)
            .then(data => {
                if (data.error)
                    setError(data.error)
                window.location.reload()

            })
    }

    const tableData = () => {
        const cols = [
            { title: 'Name', field: 'name' },
            { title: 'Mobile Number', field: 'mobile' },
            { title: 'Pin Code', field: "pincode" },
            { title: "Address", field: 'address' },
            { title: "City", field: 'city' }
        ]

        const data = addresses.map((add) => { return add })

        const editable = {
            onRowUpdate: (newData) => { editAddress(newData) },
            onRowDelete: (oldData) => { deleteAddress(oldData) },
            onRowAdd: newData => { createAddress(newData) }
        }

        return (
            <MTable cols={cols} data={data} title="Addresses" editable={editable} ></MTable>
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
                            {isLoading ? <AdminLoader /> : tableData()}
                        </div>
                    </div>
                    : ""
            }
        </Base>
    )
}

export default ManageAddresses