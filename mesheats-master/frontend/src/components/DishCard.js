import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { BiRupee } from 'react-icons/bi'
import Badge from 'react-bootstrap/Badge';
import { addItemToCart, removeItemFromCart, updateQtyInCart } from "../user/User/helper/cartHelper";
import { Redirect } from "react-router-dom";
import { BsCartPlus, BsCartX } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FiMinusCircle } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'


const MCard = ({
    dish,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f,
    quantityVisible = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(dish.count)


    const addToCart = () => {
        addItemToCart(dish)
        toast('Item Added', {
            position: "top-center"
        })
    }

    const getARedirect = redirect => {
        if (redirect)
            return <Redirect to='/cart' />
    }

    const showAddToCart = addtoCart => {
        return (
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2 px-5"
                >
                    <BsCartPlus size={"2rem"} /> Add to cart
                </button>
            )
        )
    }


    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (

                <button
                    onClick={() => {
                        removeItemFromCart(dish._id)
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2 px-5"
                >
                    <BsCartX size={"2rem"} /> Remove From Cart
                </button>
            )
        );
    };


    const updateQty = (qty) => {
        console.log("UPDATED : " + qty + " , OLD : " + count)
        updateQtyInCart(dish, qty, () => setRedirect(true))
    }

    const onDecrease = () => {
        if (count <= 1) { }
        else {
            setCount(count - 1)
            updateQty(count - 1)
        }
    }

    const onIncrease = () => {
        if (count >= 15)
            alert('You can not add items')
        else {
            setCount(count + 1)
            updateQty(count + 1)
        }
    }

    return (
        <Card
            style={{ width: "18rem", padding: "0%", borderRadius: "5%" }}
            bg="dark"
            text="white"
        >
            <ToastContainer />
            <Card.Body >
                {getARedirect(redirect)}
                <table className='mb-2' style={{ borderCollapse: 'separate', borderSpacing: '0 0.5em' }}>
                    <tr style={{ borderBottom: "0.2px solid grey" }}>
                        <td><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}>Day </Badge></td>
                        <td>{dish.dayname}</td>
                    </tr>
                    <tr style={{ borderBottom: "0.2px solid grey" }}>
                        <td><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}>Type</Badge></td>
                        <td>{dish.isLunch === 0 ? "Lunch" : dish.isLunch === 1 ? "Dinner" : "Lunch & Dinner"}</td>
                    </tr>
                    <tr style={{ borderBottom: "0.2px solid grey", margin: "0% 10%" }}>
                        <td><Badge bg="info" style={{ marginRight: "1rem", marginTop: "0.3rem", color: "black" }}>Description  </Badge></td>
                        <td> {dish.description}</td>
                    </tr>
                    <tr style={{ borderBottom: "0.2px solid grey", margin: "0% 10%" }}>
                        <td><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}>Price </Badge></td>
                        <td><BiRupee />{dish.rate}</td>
                    </tr>

                    {
                        quantityVisible ?
                            (
                                <tr className='mt-4'>
                                    <td><Badge bg="info" style={{ marginRight: "1rem", color: "black" }}>Quantity</Badge></td>
                                    <td className='row text-center'>
                                        <div className='col-4'>
                                            <button
                                                onClick={onDecrease}
                                                className="btn btn-outline-danger"
                                            >
                                                <FiMinusCircle size={"1rem"} />
                                            </button>
                                        </div>
                                        <div className='col-4'>
                                            {count}
                                        </div>
                                        <div className='col-4'>
                                            <button
                                                onClick={onIncrease}
                                                className="btn btn-outline-success"
                                            >
                                                <IoMdAddCircleOutline size={"1rem"} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            : ""
                    }

                </table>

                <div className='row text-center'>

                    <div className='col-12'>
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>


            </Card.Body>
        </Card >
    )
}

export default MCard