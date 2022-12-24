import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import AdminLoader from "../components/AdminLoader";
import { isAuthenticated } from "../Auth/helper";
import AdminLeftFixPanel from '../components/AdminLeftFixPanel'
import { Nav, Row, Col, Table } from "react-bootstrap";
import { getAllSubscriptions } from "./helper/adminapicall";
import MTable from '../components/MTable';
import SettleSubscriptions from "./SettleSubscriptions";


const ActiveSubscription = ({ match }) => {
    const { user, token } = isAuthenticated()
    const [isLoading, setIsLoading] = useState(false)
    const [subscriptions, setSubscriptions] = useState([])
    const [step, setStep] = useState(1);

    const loadSubscriptions = () => {
        getAllSubscriptions(user._id, token)
            .then(data => {
                if (data.err) {
                    return data.err
                }
                setSubscriptions(data)
            })
    }

    useEffect(() => {
        loadSubscriptions()
    }, [])


    const Tabs = () => {
        return (
            <div>
                <Nav fill variant="tabs" className="mb-3" defaultActiveKey={step}>
                    <Nav.Item>
                        <Nav.Link
                            eventKey={"1"}
                            style={step === 1 ? { color: 'green', fontWeight: 'bold' } : { color: 'green' }}
                            onClick={() => step > 1 ? setStep(step - 1) : ''}
                        >
                            Subscripitons
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="2"
                            style={step === 2 ? { color: 'green', fontWeight: 'bold' } : { color: 'green' }}
                            onClick={() => step === 1 ? setStep(step + 1) : ''}
                        >
                            Settle Payment
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

        )
    }

    const disp = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        {Tabs()}
                        {tableData()}
                    </div>
                )
            case 2:
                return (
                    <div>
                        {Tabs()}
                        {<SettleSubscriptions />}
                    </div>
                )
        }
    }

    const tableData = () => {

        const cols = [
            { title: 'Mesh Name', field: 'meshName' },
            { title: 'Paid Amount', field: 'fees' },
            { title: 'Starting Date', field: 'startDate' },
            { title: 'Ending Date', field: 'endDate' }
        ]

        const data = subscriptions.map(data => {
            let sDate = new Date(data.fromDate)
            let eDate = new Date(data.toDate)

            return {
                startDate: sDate.toLocaleDateString(),
                endDate: eDate.toLocaleDateString(),
                fees: "₹ " + data.fees + "/-",
                meshName: data.meshData[0].name,
                meshAddress: data.meshData[0].location,
                meshCity: data.meshData[0].city,
                meshMobile: data.meshData[0].mobile,
                dishDescription: data.dishData[0].description,
                dishRate: "₹ " + data.dishData[0].rate + "/-",
                isLunch: data.dishData[0].isLunch === 0 ? "Lunch" : data.dishData[0].isLunch === 1 ? "Dinner" : "Both",
                userAddress: data.addressData[0].address,
                userCity: data.addressData[0].city,
                userMobile: data.addressData[0].mobile,
                userPincode: data.addressData[0].pincode,
                paymentId: data.paymentId,
                userName: data.userData[0].name,
                userEmail: data.userData[0].email
            }
        })

        const detailPanel = rowData => {
            return (
                <div>
                    <h4 className='text-center my-2' style={{ fontSize: 'lg' }}>Order Details</h4> <hr />

                    <div className='m-2'>
                        <Row>
                            <Col>
                                <p>User Name : {rowData.userName}, +91 {rowData.userMobile}</p>
                                <p>User Email Id : {rowData.userEmail}</p>
                                <p>User Address : {rowData.userAddress}, {rowData.userCity}</p>
                            </Col>
                            <Col>
                                <p>Mess Name : {rowData.meshName}, +91 {rowData.meshMobile}</p>
                                <p>Mess Address : {rowData.meshAddress}, {rowData.meshCity}</p>
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
            <MTable data={data} cols={cols} title="Subcriptions" detailPanel={detailPanel} onRowClick={onRowClick} />
        )
    }

    return (
        <Base>
            {
                user ?
                    <div className='row mt-5'>
                        <div className='col-4'>
                            <AdminLeftFixPanel style="side" />
                        </div>
                        <div className='col-8 tb'>
                            {isLoading ? <AdminLoader /> : disp()}
                        </div>
                    </div>
                    : ""
            }
        </Base>
    )
}

export default ActiveSubscription