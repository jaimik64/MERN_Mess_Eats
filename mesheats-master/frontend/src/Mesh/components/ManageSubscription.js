import React, { useState, useEffect } from "react";
import MeshLeftPanel from './MeshLeftPanel'
import Base from "../core/Base";
import { isAuthenticated } from "../../Auth/helper";
import { getMeshSubscriptions } from "./apicall";
import MTable from "../../components/MTable";
import AdminLoader from "../../components/AdminLoader";
import { Row, Col, Table } from 'react-bootstrap'

const ManageDishes = () => {

    const { user, token } = isAuthenticated();
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getAllSubscription = () => {
        getMeshSubscriptions(user._id, token)
            .then(data => {
                setSubscriptions(data)
                console.log(data)
                setIsLoading(!isLoading)
            })
        // .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllSubscription()
    }, [])

    const tableData = () => {
        const cols = [
            { title: 'User Name', field: 'userName' },
            { title: 'User Email ', field: 'userEmail' },
            { title: 'Paid Amount', field: 'fees' },
            { title: 'Starting Date', field: 'startDate' },
            { title: 'Ending Date', field: 'endDate' },
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
        const data = subscriptions.map(data => {
            let sDate = new Date(data.fromDate)
            let eDate = new Date(data.toDate)

            return {
                userName: data.userData[0].name,
                userEmail: data.userData[0].email,
                startDate: sDate.toLocaleDateString(),
                endDate: eDate.toLocaleDateString(),
                fees: "₹ " + data.fees + "/-",
                dishDescription: data.dishData[0].description,
                dishRate: "₹ " + data.dishData[0].rate + "/-",
                isLunch: data.dishData[0].isLunch === 0 ? "Lunch" : data.dishData[0].isLunch === 1 ? "Dinner" : "Both",
                userAddress: data.addressData[0].address,
                userCity: data.addressData[0].city,
                userMobile: data.addressData[0].mobile,
                userPincode: data.addressData[0].pincode,
                paymentId: data.paymentId,
                settled: data.settled
            }
        })

        const detailPanel = rowData => {
            return (
                <div>
                    <h4 className='text-center my-2' style={{ fontSize: 'lg' }}>Order Details</h4> <hr />

                    <div className='m-2'>
                        <Row>
                            <Col>
                                <p>User Mobile : {rowData.userMobile}</p>
                                <p>User Address : {rowData.userAddress}, {rowData.userCity}</p>
                                <p>Payment Mode : {`Online Payment (${rowData.paymentId})`}</p>
                            </Col>
                        </Row>

                        <Table responsive striped hover bordered className="m-1 text-center">
                            <thead>
                                <th>Dish Description</th>
                                <th>Per Day Dish Price</th>
                                <th>Lunch / Dinner / Lunch & Dinner</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{rowData.dishDescription}</td>
                                    <td>{rowData.dishRate}</td>
                                    <td>{rowData.isLunch}</td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>
                </div>
            )
        }

        const onRowClick = (event, rowData, togglePanel) => togglePanel()

        return (
            <MTable cols={cols} data={data} title="Subscripitions" detailPanel={detailPanel} onRowClick={onRowClick} />
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