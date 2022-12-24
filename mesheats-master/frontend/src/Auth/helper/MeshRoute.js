import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../Mesh/Auth/index";

const MeshRoute = ({ component: Component, ...rest }) => {
    console.log(isAuthenticated())

    return (
        <Route
            {...rest}
            render={
                props => isAuthenticated() && isAuthenticated().Mesh === '1' ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/mesh',
                            state: { from: props.location }
                        }}
                    />
                )}
        />
    )
}

export default MeshRoute;