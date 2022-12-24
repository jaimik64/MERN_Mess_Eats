import React, { useState, useEffect, useCallback } from "react";
import Base from '../../core/Base'
import AdminLoader from "../../components/AdminLoader";
import { isAuthenticated } from "../../Auth/helper";
import UserPanel from '../../components/UserPanel'
import { loadCart, checkOut, checkCart, emptyCart, options, createOrderInRP, savePaymentDetails, validatePayment } from "./helper/cartHelper";
import DishCard from '../../components/DishCard'
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import useRazorpay from "react-razorpay";
import { getAddresses } from ".";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import Logo from '../../res/rpLogo.jpg'
import '../../Styles.css'
import Card from 'react-bootstrap/Card'
import { MdDeleteForever } from 'react-icons/md'
import { IoBagCheckOutline } from 'react-icons/io5'

const Cart = () => {
    const { user, token } = isAuthenticated();
    const [isLoading, setIsLoading] = useState(false)
    const [dishes, setDishes] = useState([])
    const [reload, setReload] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState("")
    const Razorpay = useRazorpay();
    const [address, setAddress] = useState("")
    const [addresses, setAddresses] = useState([])
    const [deliveryType, setDeliveryType] = useState(0)

    let totalBill = 0
    let cart = localStorage.getItem("cart")


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

    useEffect(() => {
        loadAddresses()
        setDishes(loadCart())
    }, [cart])

    const validatePaymentDetails = (orderid, paymentid, signature) => {

    }

    const handlePayment = async () => {

        let rpOrder = { id: null }
        // cart = JSON.parse(cart)

        // cart.forEach(dish => {
        //     totalBill += dish.totalPrice
        // });

        totalBill *= 100

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
                                        console.log(data)
                                    })

                                checkOutBtn(payment_id)
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

    const makePaymentDecision = () => {
        if (deliveryType === "Cash on Delivery") {
            totalBill *= 100
            checkOutBtn("Cash On Delivery")
        }

        if (deliveryType === "Online Payment")
            handlePayment()
    }

    const getARedirect = redirect => {
        if (redirect)
            return <Redirect to='/cart' />
    }

    const checkOutBtn = (paymentId) => {

        const dishIds = cart.map(dish => {
            return {
                qty: dish.count,
                dishId: dish._id
            }
        })

        const ob = {
            userid: user._id,
            meshid: cart[0].meshuser,
            totalbill: totalBill,
            dishes: dishIds,
            status: "placed",
            payment: paymentId,
            addressid: address
        }

        checkOut(user._id, token, ob)
            .then(data => {
                if (data.errors) {
                    setError(data._message)
                    console.log(data._message)
                    toast(data._message, { type: "error" })
                    toast("Please Select All the Details", { position: "top-center", type: "error" })
                } else {
                    toast("Order Placed", { position: "top-center", type: "success" })
                    emptyCart(() => getARedirect(true))
                    window.location.reload()
                }
            })
    }

    const totalBillCalculate = () => {
        cart = JSON.parse(cart)

        cart.forEach(dish => {
            totalBill += dish.totalPrice
        });
        return totalBill;
    }

    const loadSelectors = () => {
        console.log("Delivery Type : " + deliveryType)

        const handleChange = (e) => {
            setAddress(e)
        }

        const handleTypeChange = (e) => {
            setDeliveryType(e)
        }

        const deliveryTypeSelect = () => {
            const title = deliveryType === 0 ? "Select Delivery Type" : deliveryType;

            return (
                <DropdownButton title={title} onSelect={handleTypeChange}>
                    <Dropdown.Item eventKey={"Cash on Delivery"}>Cash On Delivery</Dropdown.Item>
                    <Dropdown.Item eventKey={"Online Payment"}>Online Payment</Dropdown.Item>
                </DropdownButton>
            )
        }


        const loadAndSelectAddress = () => {
            const title = address.length === 0 ? "Select Your Address" : "Address Selected";

            return (
                <DropdownButton title={title} onSelect={handleChange}>
                    {
                        addresses.map((data, id) => {
                            return (
                                <Dropdown.Item key={id} eventKey={data._id}>
                                    <p><b style={{ marginRight: "1rem" }}>{data.name}</b>{data.mobile}</p>
                                    <p>{data.address}, {data.city} - <b style={{ marginRight: "1rem" }}>{data.pincode}</b></p>
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            )
        }

        return (
            <div>
                <Row>
                    <Col>{loadAndSelectAddress()}</Col>
                    <Col>{deliveryTypeSelect()}</Col>
                </Row>
            </div>
        )
    }

    const loadAllProducts = () => {
        let disable = address !== "" && deliveryType !== 0 ? false : true;
        return (
            <div>
                <h2>Cart dishes</h2>

                {
                    checkCart() === 0 ? (
                        <div>
                            <button
                                onClick={() => emptyCart(() => getARedirect(redirect))}
                                className="btn btn-danger btn-block mb-2"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Empty Cart"
                                width="10%"
                            >
                                <MdDeleteForever size={"1.5rem"} />
                            </button>
                            {

                                (
                                    <button
                                        onClick={(e) => makePaymentDecision()}
                                        className="btn btn-success btn-block mb-2 mx-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Checkout"
                                        disabled={disable}
                                    >
                                        <IoBagCheckOutline size={"1.5rem"} />
                                    </button>
                                )
                            }
                            <span className="mb-2 mx-2">

                                {loadSelectors()}
                            </span>

                            <span className=" mx-2">
                            </span>
                            <div >
                                {
                                    address ?
                                        <div className="my-2 cart-address">
                                            <span className="d-inline">{
                                                addresses.map((data, id) => {
                                                    if (address === data._id) {
                                                        return (
                                                            <Card
                                                                style={{ width: "18rem", padding: "2%", borderRadius: "3%" }} key={id}
                                                                bg="dark"
                                                                text="white"
                                                                className="my-2 p-2"
                                                            >
                                                                <span className="d-block mb-1">Payment : <b>{deliveryType}</b></span>
                                                                <span className="d-inline">Deliver to :  </span>
                                                                <span className="d-inline"><b style={{ marginRight: "2rem" }}>{data.name}, {data.pincode}</b></span>
                                                                <span className="mt-2 d-block">{data.address}, {data.city}</span>
                                                            </Card>
                                                        )
                                                    }
                                                })
                                            }</span>
                                        </div>
                                        : ""
                                }
                            </div>

                            <h3 className="mb-3">Total Bill : {"₹ " + totalBillCalculate() + ".00 /-"}</h3>
                        </div>
                    ) :
                        ""
                }

                <ToastContainer position="top-center" />
                <div className="row">
                    {
                        dishes ? dishes.map((dish, index) => {
                            return (
                                <div key={index} className="col-4 mb-4">

                                    <DishCard
                                        key={index}
                                        dish={dish}
                                        addtoCart={false}
                                        removeFromCart={true}
                                        setReload={setReload}
                                        reload={reload}
                                        quantityVisible={true}
                                    />
                                </div>
                            )
                        }) : "No Added Dishes"
                    }
                </div>
            </div >
        )
    }

    return (
        <Base>
            {
                user ?
                    <div className="row mt-5">
                        <div className="col-4">
                            <UserPanel style="side" />
                        </div>
                        <div className="col-8 tb">
                            {isLoading ? <AdminLoader /> : loadAllProducts()}
                        </div>
                    </div>
                    : ""
            }
        </Base>
    )
}

export default Cart
