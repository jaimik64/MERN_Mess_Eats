import { API } from "../../backend";

export const getAddresses = (userId, token) => {
    return fetch(`${API}/users/addresses/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err.json() })
}

export const addAddress = (userId, token, address) => {
    return fetch(`${API}/users/addAddress/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(address)
    })
        .then(res => { return res.json() })
        .catch(err => { return err.json() })
}

export const updateAddress = (userId, token, address, addressId) => {
    return fetch(`${API}/users/updateAddress/${userId}/${addressId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(address)
    })
        .then(res => { return res.json() })
        .catch(err => { return err.json() })
}

export const removeAddress = (userId, token, addressId) => {
    return fetch(`${API}/users/removeAddress/${userId}/${addressId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err.json() })
}

export const getMeshes = (userId, token) => {
    return fetch(`${API}/users/meshes/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getDishesByMeshID = (userId, meshId, token) => {


    return fetch(`${API}/users/mesh/dishes/${userId}/${meshId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getSpecificMeshDetail = (userId, meshId, token) => {
    return fetch(`${API}/users/mesh/detail/${userId}/${meshId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getMeshDetailForHomePage = () => {
    return fetch(`${API}/users/meshes`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getAllOrdersByUser = (userId, token, data) => {


    return fetch(`${API}/order/orderDetails/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            return err
        })
}

export const getSubscriptionsByMess = (userId, token, meshId) => {
    return fetch(`${API}/users/subscriptions/${userId}/${meshId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            return err
        })
}

export const buySubcription = (userId, token, data) => {
    return fetch(`${API}/users/buy/subscription/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getUserSubscription = (userId, token) => {
    return fetch(`${API}/users/subscription/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}