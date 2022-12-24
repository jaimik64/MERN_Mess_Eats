import { API } from "../../backend";

// Get All Users Details
export const getAllUsers = (adminId, token) => {

    return fetch(`${API}/admin/getAllUsers/${adminId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}

// Update Admin Profile
export const updateProfile = (token, userId, adminId, user) => {

    return fetch(`${API}/admin/updateRole/${userId}/${adminId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json({
            msg: "Trying..."
        });
    })
        .catch(err => console.log(err))
}

// Get All Dishes 
export const getAllDishes = (adminId, token) => {
    return fetch(`${API}/admin/allDishes/${adminId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}

// Get All Mesh Details
export const getAllMeshUsers = (adminId, token) => {
    return fetch(`${API}/admin/mesh/${adminId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}

// Get All Addresses of user
export const getAllAddresses = (token, adminId) => {
    return fetch(`${API}/admin/allAddresses/${adminId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}


export const removeUser = (token, adminId, user) => {
    return fetch(`${API}/admin/removeUser/${user}/${adminId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}

export const removeMesh = (token, adminId, mesh) => {
    return fetch(`${API}/admin/removeMesh/${mesh}/${adminId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}


export const getAllOrderDetails = (user, token) => {
    return fetch(`${API}/order/allOrders/${user}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {

            return res.json()
        })
        .catch(err => { return err })
}

export const getAllSubscriptions = (userId, token) => {
    return fetch(`${API}/admin/subscription/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const getAllUnSettledOrders = (userId, token) => {
    return fetch(`${API}/admin/unsettledOrders/${userId}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const settleAllOrders = (userId, token) => {
    return fetch(`${API}/admin/settleOrders/${userId}`, {
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

export const getAllUnSettledSubs = (userId, token) => {
    return fetch(`${API}/admin/unsettledSubscriptions/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => { return res.json() })
        .catch(err => { return err })
}

export const settleAllSubs = (userId, token) => {
    return fetch(`${API}/admin/settleSubscriptions/${userId}`, {
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
