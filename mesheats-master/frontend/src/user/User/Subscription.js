import React, { useState, useEffect, useCallback } from "react";
import Base from "../../core/Base";
import AdminLoader from "../../components/AdminLoader";
import { isAuthenticated } from "../../Auth/helper";
import UserPanel from '../../components/UserPanel'
import { Nav, Row, Col, Container, DropdownButton, Dropdown, Button, Card, ButtonGroup } from "react-bootstrap";
import { getMeshes, getSubscriptionsByMess, getAddresses, buySubcription } from ".";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { createOrderInRP, savePaymentDetails, validatePayment } from "./helper/cartHelper";
import { ToastContainer, toast } from 'react-toastify'
import useRazorpay from "react-razorpay";
import { Redirect } from "react-router-dom";
import ActiveSubscription from "./ActiveSubscription";


const Subscription = () => {
    const { user, token } = isAuthenticated()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [meshes, setMeshes] = useState([])
    const [mesh, setMesh] = useState({})
    const [dish, setDish] = useState({})
    const [dishes, setDishes] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [address, setAddress] = useState({})
    const [addresses, setAddresses] = useState([])
    const [step, setStep] = useState(1)
    const Razorpay = useRazorpay();

    const loadMeshes = () => {
        getMeshes(user._id, token)
            .then(data => {
                if (data.err)
                    return data.err
                setMeshes(data)
                // console.log(data)
            })
    }

    const loadAddresses = () => {
        setIsLoading(true)

        getAddresses(user._id, token)
            .then(data => {
                if (data.err)
                    return data.err
                setAddresses(data)
                setIsLoading(false)
            })
    }

    const loadDish = () => {
        let meshId = mesh._id === undefined ? "6354cc2d447a1905f92abe9e" : mesh._id
        // console.log("SELECTED MESS : " + JSON.stringify(mesh))
        getSubscriptionsByMess(user._id, token, meshId)
            .then(data => {
                if (data.error)
                    return data.error
                // console.log(data)
                setDishes(data)
            })
    }

    useEffect(() => {
        loadMeshes()
        loadDish()
        loadAddresses()
    }, [mesh])


    const handleMessChange = (e) => {
        setMesh(JSON.parse(e))
        console.log(JSON.parse(e))
    }

    const handleDishChange = (e) => {
        setDish(JSON.parse(e))
        console.log(JSON.parse(e))
    }
    const handleAddressChange = (e) => {
        setAddress(JSON.parse(e))
        console.log(JSON.parse(e))
    }


    const loadAndSelectMesh = () => {
        const title = mesh._id === undefined ? "Select Mess" : mesh.name + ", " + mesh.city;

        return (
            <div className="d-inline p-0 ">
                <span style={{ marginRight: "1rem" }}>Select Mess </span>
                <DropdownButton
                    as={ButtonGroup}
                    align={{ lg: 'start' }}
                    className="d-inline form-control p-0"
                    onSelect={handleMessChange}
                    title={title}
                    drop='down-centered'
                >
                    {
                        meshes.map((data, id) => {
                            return (
                                <Dropdown.Item key={id} eventKey={JSON.stringify(data)} className="border-bottom">
                                    <p><b style={{ marginRight: "1rem" }}>{data.name}</b>{data.mobile}</p>
                                    <p>{data.location}, {data.city}</p>
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            </div>
        )
    }

    const loadAndSelectDish = () => {

        const title = dish.dayname === undefined ? "Select Dish" : "Selected";

        return (
            <div className="d-inline">
                <span style={{ marginRight: "1rem" }}>Select Dishes </span>
                <DropdownButton
                    onSelect={handleDishChange}
                    title={title}
                    align={{ lg: 'start' }}
                    className="d-inline"

                >
                    {
                        dishes.map((data, id) => {
                            let type = data.isLunch === 2 ? "Both" : data.isLunch === 1 ? "Lunch" : "Dinner"
                            return (
                                <Dropdown.Item key={id} eventKey={JSON.stringify(data)}>
                                    <p>{type} - ₹ {data.rate}/-</p>
                                    <p>{data.description}</p>
                                    <hr />
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            </div>
        )
    }

    const selectStartDate = () => {
        let d = new Date()
        let minDate = d.setDate(startDate.getDate() + 1)
        return (
            <div className="d-inline form-group">
                <label>Select Starting Date</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    minDate={minDate}
                    className="form-control"
                />
            </div>

        );
    }

    const selectEndDate = () => {
        let futureDate = new Date()
        let minDate = futureDate.setDate(startDate.getDate() + 30)
        return (
            <div className="d-inline form-group">
                <span>Select End Date</span>
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    minDate={minDate}
                    className="form-control"
                />
            </div>

        )
    }

    const loadAndSelectAddress = () => {
        const title = address.name === undefined ? "Select Your Address" : "Address Selected";

        return (
            <div className="d-inline">
                <span style={{ marginRight: "1rem" }}>Select Address </span>
                <DropdownButton
                    title={title}
                    onSelect={handleAddressChange}
                    className="d-inline form-control p-0"
                >
                    {
                        addresses.map((data, id) => {
                            return (
                                <Dropdown.Item key={id} eventKey={JSON.stringify(data)}>
                                    <p><b style={{ marginRight: "1rem" }}>{data.name}</b>{data.mobile}</p>
                                    <p>{data.address}, {data.city} - <b style={{ marginRight: "1rem" }}>{data.pincode}</b></p>
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            </div>

        )
    }


    const validatePaymentDetails = (orderid, paymentid, signature) => {

    }

    const checkOutBtn = (paymentId, days) => {
        let data = {
            fees: days * dish.rate,
            toDate: startDate,
            fromDate: endDate,
            userId: user._id,
            meshId: mesh._id,
            addressId: address._id,
            dishId: dish._id,
            paymentId: paymentId
        }

        buySubcription(user._id, token, data)
            .then(data => {
                if (data.errors) {
                    setError(data._message)
                    toast(data._message, { type: "error" })
                } else {
                    toast("Congratulation!!!", { position: "top-center", type: 'success' })
                    setMesh({})
                    setDish({})
                    setAddress({})
                    return (
                        <Redirect to="/user/active/subscription" />
                    )
                }
            })
    }

    const handleSubscriptionOrder = async (days) => {
        if (days < 30) {
            alert('Please Select More Days')
        } else {
            let totalBill = days * dish.rate * 100

            let rpOrder = { id: null }

            const order = await createOrderInRP(user._id, token, { totalbill: totalBill })
                .then(data => {
                    rpOrder.id = data.id
                })
            let payment_id = ""
            if (rpOrder.id !== null) {
                const ID = process.env.RAZORPAY_KEY_ID !== undefined ? process.env.RAZORPAY_KEY_ID : "rzp_test_QiAASC0rtzmhlz";

                const options = {
                    key: ID, // Enter the Key ID generated from the Dashboard
                    amount: totalBill, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: "Mess Eat",
                    description: "Test Transaction",
                    image: "https://github.com/jaimik64/mesheats/blob/34522c0cd38ed7d920a3756aa0a68ee0e8266c47/frontend/rpLogo.jpg",
                    order_id: rpOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                    handler: (response) => {
                        payment_id = response.razorpay_payment_id

                        const verification = validatePaymentDetails(rpOrder.id, response.razorpay_payment_id, response.razorpay_signature)
                        // console.log(verification)

                        validatePayment(user._id, token, { orderid: rpOrder.id, paymentid: response.razorpay_payment_id, signature: response.razorpay_signature })
                            .then(data => {
                                if (data.msg == "payment is successfull") {
                                    savePaymentDetails(user._id, token, { paymentid: response.razorpay_payment_id, orderid: response.razorpay_order_id, signature: response.razorpay_signature })
                                        .then(data => {
                                            if (data.errors) {
                                                return data.errors
                                            }
                                            // console.log(data)
                                        })

                                    checkOutBtn(payment_id, days)
                                } else {
                                    toast('Payment Verfication Fails')
                                }
                            })
                    },
                    prefill: {
                        name: "test",
                        email: "test@gmail.com",
                        contact: "8401563076",
                    },
                    notes: {
                        address: "Mess-Eats Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const rzp1 = new Razorpay(options);

                rzp1.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);

                    payment_id = response.error.code + " , " + response.error.description;

                    // checkOutBtn(payment_id)
                });

                rzp1.open();
            }

        }
    }

    const details = () => {

        let days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)

        days = days < 0 ? 0 : days

        let disable = days < 30 ? true : false;
        let type = dish.isLunch === 0 ? "Lunch" : dish.isLunch === 1 ? "Dinner" : "Both"

        return dish._id !== undefined && mesh._id !== undefined && address._id !== undefined && (
            <Container className="mt-3">
                <Card style={{ borderRadius: "3%", padding: "0rem" }}>
                    <Card.Header className="text-center">Subscripiton Details</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div className="mesh">
                                <span className="d-block">Mess Details - <b>{mesh.name}</b></span>
                                <span className="d-block address">Address : {mesh.location}, {mesh.city}  </span>
                                <span className="mob">Mobile : {mesh.mobile}</span>
                            </div>
                            <div className="dish">
                                <span className="d-block">Dish Details</span>
                                <span>{dish.description}</span>
                                <span className="d-block">Price per Day : {dish.rate}</span>
                                <span>Lunch / Dinner / Both : {type}</span>
                            </div>
                            <p>Start Date : {startDate.toLocaleDateString()} - End Date : {endDate.toLocaleDateString()}</p>
                            <p>Days : {days} * {dish.rate}</p>
                            <p>Total Amount : {days !== 0 ? days * dish.rate : "0"}</p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        {
                            dish._id !== undefined && mesh._id !== undefined && address._id !== undefined &&
                            (
                                <Button
                                    className="px-2 d-block btn btn-success"
                                    onClick={() => { handleSubscriptionOrder(days) }}
                                    disabled={disable}
                                >
                                    Confirm Subscription
                                </Button>
                            )
                        }
                    </Card.Footer>

                </Card>

            </Container>
        )
    }

    const NavBar = () => {
        return (
            <Nav variant="tabs" className="mb-3" fill defaultActiveKey={step}>
                <Nav.Item>
                    <Nav.Link
                        eventKey='1'
                        style={step === 1 ? { color: 'green', fontWeight: 'bold' } : { color: 'green' }}
                        onClick={() => step > 1 ? setStep(step - 1) : ''}
                    >
                        Buy Subscripiton
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey='2'
                        style={step === 2 ? { color: 'green', fontWeight: 'bold' } : { color: 'green' }}
                        onClick={() => step == 1 ? setStep(step + 1) : ''}
                    >
                        Active Subscripiton
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

    const formDetails = () => {
        return (
            <div className="mt-2 p-2">
                <div className="p-5 text-center">
                    <h2 className="py-3 border-bottom border-dark">Food Subscription Form</h2>
                </div>
                <div className="d-inline">
                    {loadAndSelectMesh()}

                </div>
                <div className="d-block mt-2">
                    {
                        mesh._id === undefined ? "" : loadAndSelectDish()
                    }
                </div>

                <div className="row mt-2">
                    <div className="col-6">

                        {
                            dish._id === undefined ? "" : selectStartDate()
                        }
                    </div>
                    <div className="col-6">
                        {
                            dish._id == undefined ? "" : selectEndDate()
                        }
                    </div>

                </div>
                <div className="mt-2">
                    {
                        dish._id === undefined ? "" : loadAndSelectAddress()
                    }
                </div>
                {
                    details()
                }
                <ToastContainer />
            </div>
        )
    }

    const Tabs = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        {NavBar()}
                        {formDetails()}
                    </div>
                )
            case 2:
                return (
                    <div>
                        {NavBar()}
                        {<ActiveSubscription />}
                    </div>
                )
        }
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
                            {isLoading ? <AdminLoader /> : Tabs()}
                        </div>
                    </div>
                    : ""
            }
        </Base>
    )
}

export default Subscription