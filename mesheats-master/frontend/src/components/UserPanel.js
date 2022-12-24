import React from "react";
import User from '../res/user.webp'
import Order from '../res/order.png'
import Mesh from '../res/mesh.png'
import AdminLink from "./AdminLink";
import { FaRegAddressCard, FaCartArrowDown } from 'react-icons/fa'
import { CiViewList } from 'react-icons/ci'


const UserPanel = ({ style }) => {

    const s = style //+ " p-2 shadow-lg rounded-xl shadow-slate-500";

    return (
        <div className={s}>
            <div className="my-8 ml-2 p-2 px-5 shadow-lg rounded-xl shadow-slate-500 box1">

                <div style={{ display: "inline" }}>
                    <AdminLink icon={<FaRegAddressCard size={"2rem"} color="black" />} text="Manage Addresses" link="/user/addresses" />
                </div>
                <AdminLink icon={<CiViewList size={"2rem"} color="black" />} text="View Near by Mess" link="/user/meshDetails" />
                <AdminLink imgSrc={Mesh} text="Subscription" link="/user/subscription" />
                <AdminLink icon={<FaCartArrowDown size={"2rem"} color="black" />} text="Orders" link="/user/orders" />

            </div>
        </div >
    )
}

export default UserPanel;