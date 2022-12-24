import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from ".";

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                props => isAuthenticated() && isAuthenticated().user.role === 1 && !isAuthenticated().Mesh ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )

            }
        />
    )
}

export default AdminRoute;