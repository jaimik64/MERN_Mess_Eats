import React, { useState, useEffect } from "react";
import MeshLeftPanel from './MeshLeftPanel'
import Base from "../core/Base";
import { isAuthenticated } from "../../Auth/helper";
import { getOrdersByMessId, updateOrder } from "./apicall";
import MTable from "../../components/MTable";
import AdminLoader from "../../components/AdminLoader";
import { Row, Col, Table, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom";

const ManageDishes = () => {

    const { user, token } = isAuthenticated();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getOrders = () => {
        setIsLoading(!isLoading)
        getOrdersByMessId(user._id, token, { messId: user._id })
            .then(data => {
                if (data.err)
                    setError(data.err)
                else
                    setOrders(data)
                console.log(data)
                setIsLoading(!isLoading)
            })
    }

    useEffect(() => {

        getOrders();

    }, [])

    const changeOrderDetails = (orderDetails) => {
        setIsLoading(true)
        console.log("ORDER DETAILS : " + JSON.stringify(orderDetails))

        updateOrder(user._id, orderDetails._id, token, { status: orderDetails.status })
            .then(data => {
                if (data.error)
                    setError(data.error)
                window.location.reload()
                setIsLoading(false)
            })

    }


    const tableData = () => {
        const cols = [
            { title: 'User Name', field: 'userName', editable: false },
            { title: 'Total Bill', field: 'totalbill', editable: false },
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
            { title: 'Order Date', field: 'date', editable: false },
            { title: 'Order Time', field: 'time', editable: false },
            {
                title: 'Payment Settled?',
                field: 'settled',
                lookup: {
                    'true': 'Settled',
                    'false': 'Pending'
                },
                editable: false
            }
        ]

        const data = orders.map((order) => {
            let date = new Date(order.createdAt)

            return {
                _id: order._id,
                userName: order.userData[0].name,
                userMail: order.userData[0].email,
                userMob: order.userData[0].mobile,
                address: order.Address[0].address === undefined ? "" : order.Address[0].address,
                city: order.Address[0].city === undefined ? "" : order.Address[0].city,
                receiveMob: order.Address[0].mobile,
                receiveName: order.Address[0].name,
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                dishes: order.dishDetails,
                quantity: order.dishes,
                totalbill: order.totalbill / 100,
                status: order.status,
                payment: order.payment,
                settled: order.settled
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
                    <Table responsive striped bordered hover className='m-1 text-center' style={{ fontSize: "0.9rem" }} >
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
                                <td colspan="2"><b>Total Bill</b></td>
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
                                <div>
                                    <Badge bg="info" style={{ marginRight: "1rem", color: "black" }}>Contact Person Details </Badge> {rowData.receiveName}, <a style={{ textDecoration: 'none', color: 'black' }} href={`tel:+91 ${rowData.receiveMob}`}>{rowData.receiveMob}</a>
                                    <hr />
                                    <div><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}>User Email Id </Badge> <a href={`mailto:${rowData.userMail}`} style={{ color: 'black' }}>{rowData.userMail}</a></div>
                                    <hr />
                                    <div>
                                        <Badge bg="info" style={{ marginRight: "1rem", color: "black", marginBottom: "1rem" }}>Payment Mode </Badge>
                                        {rowData.payment !== "Cash On Delivery" ? `Payment ID (${rowData.payment})` : "Cash On Delivery"}
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <span className="d-block"><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}> Delivery Address </Badge> {rowData.address}, {rowData.city}</span> <hr />
                                <div><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}> Status </Badge>{rowData.status}</div>
                            </Col>
                        </Row>
                    </div>
                    {table()}
                </div>
            )
        }

        const editable = {
            onRowUpdate: (newData, oldData) => { changeOrderDetails(newData) },
        }
        const onRowClick = (event, rowData, togglePanel) => togglePanel()

        return (
            <MTable cols={cols} data={data} title="Dishes" editable={editable} detailPanel={detailPanel} onRowClick={onRowClick} />
        )
    }

    return (
        <Base>
            {
                user ?
                    <div className='row mt-5'>
                        <div className='col-4'>
                            <MeshLeftPanel style="side" />
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

export default ManageDishes