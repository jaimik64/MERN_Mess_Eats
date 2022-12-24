import { API } from '../../backend'

export const signup = user => {

    return fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json();
        })
        .catch(err => { return err.json() })
}

export const signin = user => {
    return fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}


export const getUserDetail = (userId, token) => {
    return fetch(`${API}/users/getprofile/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => { return response.json() })
        .catch(err => { return err.json() })
}

export const updateProfile = (userId, token, updateUser) => {
    return fetch(`${API}/users/updateProfile/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateUser)
    })
        .then(response => { return response.json() })
        .catch(err => { return err.json() })
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/auth/signout`, {
            method: "GET"
        })
            .then(res => console.log("Sign out successfully"))
            .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if (typeof window !== "object") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }
}
