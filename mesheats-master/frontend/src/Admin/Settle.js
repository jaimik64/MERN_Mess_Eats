import React, { useState, useEffect } from 'react';
import Base from '../core/Base'
import { isAuthenticated } from '../Auth/helper';
import AdminLoader from '../components/AdminLoader';
import MTable from '../components/MTable';
import { Nav, Button } from "react-bootstrap";
import { getAllUnSettledOrders, settleAllOrders } from './helper/adminapicall';
import { ToastContainer, toast } from 'react-toastify'

const Settle = () => {

    const [error, setError] = useState(false)
    const { user, token } = isAuthenticated();
    const [isLoading, setIsLoading] = useState(true);
    const [settledOrders, setSettledOrders] = useState([]);

    const getOrders = () => {
        setIsLoading(!isLoading)
        getAllUnSettledOrders(user._id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    console.log(data)
                    setSettledOrders(data)
                }
                setTimeout(() => { setIsLoading(!isLoading) }, 1000);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOrders();
    }, [])

    const tableData = () => {
        const cols = [
            { title: 'Mesh Name', field: 'meshName' },
            { title: 'Location', field: 'location' },
            { title: 'City', field: 'city' },
            { title: 'Mail Id', field: 'email' },
            { title: 'Mobile', field: 'mobile' },
            { title: 'Total Amount', field: 'totalOrder' }
        ]

        const data = settledOrders.map((order) => {
            return {
                totalOrder: order.total / 100,
                meshName: order.meshUsers[0].name,
                location: order.meshUsers[0].location,
                city: order.meshUsers[0].city,
                email: order.meshUsers[0].email,
                mobile: order.meshUsers[0].mobile
            }
        })

        return (
            <MTable cols={cols} data={data} title="Order Settlement" />
        )
    }

    const settleButton = () => {
        const settle = () => {
            settleAllOrders(user._id, token)
                .then(data => {
                    if (data.error) {
                        toast('Error Occured', { position: 'top-center', type: 'error' })
                        setError(data.error)
                    }
                    toast('Orders Settled With Mess', { position: 'top-center', type: 'success' })
                })
        }

        return (
            <Button className="m-2" onClick={() => { settle() }} > Settle Payment</Button>
        )
    }

    const disp = () => {
        return (
            <div>
                {settleButton()}
                {tableData()}
            </div>
        )

    }

    return (
        <Base>
            <ToastContainer />
            {isLoading ? <AdminLoader /> : disp()}
        </Base>
    )
}

export default Settle;