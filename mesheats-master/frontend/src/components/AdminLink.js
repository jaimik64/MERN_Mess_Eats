import React from "react";
import { Link } from "react-router-dom";


const AdminLink = ({ imgSrc, text, link, icon }) => {
    return (

        <div className="ui comments py-3">
            <div className="comment">
                <Link className="avatar" href="#">
                    <img src={imgSrc} />
                    {icon}
                </Link>
                <div className="pt-1 font-weight-bolder">
                    <Link className="text1" to={link}>{text}</Link>
                </div>
            </div>
        </div>
    )
}
export default AdminLink;