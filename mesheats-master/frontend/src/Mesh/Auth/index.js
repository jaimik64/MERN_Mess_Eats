import { Redirect } from 'react-router-dom';
import { API } from '../../backend';

export const meshSignUp = user => {
    return fetch(`${API}/mesh/auth/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const meshSignIn = user => {

    console.log("MESHSIGNIN : " + JSON.stringify(user))

    return fetch(`${API}/mesh/auth/signin`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
    )
        .then(res => {
            console.log(res)
            return res.json()
        })
        .catch(err => console.log(err))
}


export const meshSignOut = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        localStorage.removeItem("Mesh")
        next()

        return fetch(`${API}/mesh/auth/signout`, {
            method: "GET"
        })
            .then(res => { return res.json() })
            .catch(err => console.log(err))
    }
}


export const isAuthenticated = () => {
    if (typeof window !== "object") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        let str = JSON.parse(localStorage.getItem("jwt"))
        str.Mesh = localStorage.getItem("Mesh")
        return str
    } else {
        return false;
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        localStorage.setItem("Mesh", 1)
        next();
    }
}
