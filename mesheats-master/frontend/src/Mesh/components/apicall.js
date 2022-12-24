import { API } from '../../backend'

export const getUserDetail = (meshId, token) => {
    return fetch(`${API}/mesh/user_details/${meshId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => console.log(err))
}


export const getAllMeshDishes = (meshId, token) => {
    return fetch(`${API}/mesh/dishes/${meshId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => console.log(err))
}

export const removeDish = (meshId, dishId, token) => {
    return fetch(`${API}/mesh/removeDish/${meshId}/${dishId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => console.log(err))
}

export const getSubscriptions = (meshId, token) => {
    return fetch(`${API}/mesh/subscription/${meshId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => console.log(err))
}

export const addDishDetails = (meshId, token, dish) => {

    return fetch(`${API}/mesh/addDish/${meshId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dish)
    })
        .then(res => { return res.json() })
        .catch(err => console.log(err))
}

export const updateDish = (userId, dishId, token, dish) => {

    return fetch(`${API}/mesh/updateDish/${userId}/${dishId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dish)
    })
        .then(res => { return res.json() })
        .catch(err => console.log(err))
}

export const updateProfile = (userId, token, user) => {
    return fetch(`${API}/mesh/update/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => { return res.json() })
        .catch(err => { return { err: err } })
}

export const getOrdersByMessId = (userId, token, data) => {
    return fetch(`${API}/mesh/orders/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .catch(err => { return { err: err } })
}

export const updateOrder = (userId, orderId, token, data) => {
    console.log(data)
    return fetch(`${API}/mesh/updateOrder/${userId}/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getMeshSubscriptions = (userId, token) => {
    return fetch(`${API}/mesh/subscriptions/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}