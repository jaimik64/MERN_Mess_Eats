import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import MyComponent from 'react-fullpage-custom-loader'


const Base = ({
    title = "My Title",
    description = "My Description",
    className = "p-5",
    children
}) => {

    const [loading, setLoading] = useState(true);
    const sentences = [""]

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 500)
    }, [])


    const loader = () => {
        return (
            <MyComponent loaderType="ball-atom" fadeIn sentences={sentences} />
        )
    }

    const child = () => {
        return (
            <div>
                <Menu />
                <div className="mt-auto">
                    <div className={className}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {loading ? loader() : child()}
        </div>
    )
}

export default Base;