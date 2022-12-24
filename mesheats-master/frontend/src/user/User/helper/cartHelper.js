import { API } from '../../../backend'

export const addItemToCart = (item, next) => {
    let cart = []
    let flag = false

    if (typeof window !== undefined) {

        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === item._id) {
                alert("Item Exist")
                flag = true
                break;
            }

            if (cart[i].meshuser !== item.meshuser) {
                alert("NOTE : You can not order from different meshes, You must empty cart from first Mesh")
                flag = true
                break
            }
        }

        if (!flag) {
            cart.push({
                ...item,
                count: 1,
                totalPrice: 1 * item.rate
            });

            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }

}

export const updateQtyInCart = (item, quantity, next) => {
    let cart = []

    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === item._id) {
                cart[i].count = quantity
                cart[i].totalPrice = quantity * item.rate
                break;
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const checkCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart") && localStorage.getItem("cart").length >= 3) {
            console.log("CART LENGTH : " + localStorage.getItem("cart").length)
            return 0
        } else {
            return 1
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []

    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, index) => {
            if (product._id === productId) {
                cart.splice(index, 1)
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}

export const emptyCart = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart");
        next()
    }
}

export const checkOut = (userId, token, cart) => {
    console.log("INSIDE BACKEND CALL : " + JSON.stringify(cart))
    return fetch(`${API}/order/createOrder/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        body: JSON.stringify(cart)
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const createOrderInRP = (userId, token, totalbill) => {

    return fetch(`${API}/order/createRPOrder/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(totalbill)
    })
        .then(res => { return res.json() })
        .catch(err => { return err.json() })
}



export const savePaymentDetails = (user, token, data) => {
    return fetch(`${API}/order/storeRPOrderDetails/${user}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/josn",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .catch(err => { return err.json() })
}

export const validatePayment = (user, token, data) => {
    return fetch(`${API}/order/validateSignature/${user}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}