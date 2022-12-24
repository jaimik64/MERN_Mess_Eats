import React, { useState, useEffect } from 'react';
import Base from '../../core/Base'
import { Col, Table, Row } from 'react-bootstrap';
import { isAuthenticated } from '../../Auth/helper'
import UserPanel from '../../components/UserPanel';
import AdminLoader from '../../components/AdminLoader'
import MTable from '../../components/MTable';
import { getAllOrdersByUser } from '.';


const Orders = () => {

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false)
    const { user, token } = isAuthenticated();


    const loadAllOrders = () => {
        getAllOrdersByUser(user._id, token, { id: user._id })
            .then(data => {
                setOrders(data)
                console.log(data)
                setTimeout(() => { setIsLoading(false) }, 1000)
            })
    }

    useEffect(() => {
        loadAllOrders()
    }, [])

    const tableData = () => {
        const cols = [
            { title: 'User Name', field: 'username' },
            { title: 'Mess name', field: 'messname' },
            { title: 'Total Bill', field: 'totalbill' },
            {
                title: 'Order Status',
                field: 'status',
                lookup: {
                    "placed": "Placed",
                    "preparing": "Preparing",
                    "outfordelivery": "Out For Delivery",
                    "delivered": "Delivered"
                }
            },
            { title: 'Order Date', field: 'date', sorting: true },
            { title: 'Order Time', field: 'time' }
        ]

        const data = orders.map(order => {
            let date = new Date(order.createdAt)

            return {
                username: order.UserData[0].name,
                usermail: order.UserData[0].email,
                messname: order.MeshData[0].name,
                messemail: order.MeshData[0].email,
                messloc: order.MeshData[0].location,
                totalbill: "₹ " + order.totalbill / 100 + "/-",
                messcity: order.MeshData[0].city,
                useraddress: order.Address[0].address === undefined ? "" : order.Address[0].address,
                usercity: order.Address[0].city === undefined ? "" : order.Address[0].city,
                status: order.status,
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                dishes: order.DishDetails,
                quantity: order.dishes,
                payment: order.payment
            }
        })

        const detailPanel = rowData => {
            let dishes = rowData.dishes
            let quantity = rowData.quantity
            let count = 1
            let data = []

            for (let i = 0; i < dishes.length; i++) {
                if (data[i] === undefined) {
                    data[i] = {
                        sr: count,
                        desc: '',
                        rate: 0,
                        qty: 0
                    }
                }
                data[i].desc = dishes[i].description
                data[i].rate = dishes[i].rate
                data[i].qty = quantity[i].qty
                count++
            }

            let table = () => {
                return (
                    <Table responsive striped bordered hover className='m-2 text-center' >
                        <thead>
                            <th>Sr. No.</th>
                            <th>Dish Description</th>
                            <th>Dish Price</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </thead>
                        <tbody>
                            {
                                dishes !== undefined ? data.map(dish => {
                                    return (
                                        <tr>
                                            <td>{dish.sr}</td>
                                            <td>{dish.desc}</td>
                                            <td>{dish.rate}</td>
                                            <td>{dish.qty}</td>
                                            <td>{dish.rate * dish.qty}</td>
                                        </tr>
                                    )
                                }) : ""
                            }
                            <tr>
                                <td colspan="2"></td>
                                <td colspan="2">Total Bill</td>
                                <td >{rowData.totalbill}</td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }

            return (
                <div>
                    <h4 className='text-center my-2' style={{ fontSize: 'lg' }}>Order Details</h4> <hr />

                    <div className='m-2'>
                        <Row>
                            <Col>
                                <p>User Email Id : {rowData.usermail}</p>
                                <p>User Address : {rowData.useraddress}, {rowData.usercity}</p>
                                <p>Payment Mode : {rowData.payment !== "Cash On Delivery" ? "Online Payment" : "Cash On Delivery"}</p>
                            </Col>
                            <Col>
                                <p>Mess Email Id : {rowData.messemail}</p>
                                <p>Mess Address : {rowData.messloc}, {rowData.messcity}</p>
                            </Col>
                        </Row>

                    </div>
                    {table()}
                </div>
            )
        }

        const onRowClick = (event, rowData, togglePanel) => togglePanel()

        return (
            <MTable data={data} cols={cols} title="Orders" detailPanel={detailPanel} onRowClick={onRowClick} />
        )
    }

    return (
        <Base>
            <div className='row mt-5'>
                <div className='col-4'>
                    <UserPanel style="side" />
                </div>
                <div className='col-8 tb'>
                    {isLoading ? <AdminLoader /> : tableData()}
                </div>
            </div>
        </Base>
    )
}

export default Orders;