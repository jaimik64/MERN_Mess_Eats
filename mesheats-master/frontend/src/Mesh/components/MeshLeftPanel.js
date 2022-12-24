import React from "react";
import User from '../../res/user.webp'
import Order from '../../res/order.png'
import Mesh from '../../res/mesh.png'
import MLink from "../components/MLink";


const AdminLeftFixPanel = ({ style }) => {

    const s = style + " p-4 ";

    return (
        <div className={s}>

            <div className="my-8 ml-2 p-2 px-5 shadow-lg rounded-xl shadow-slate-500 box1">

                <MLink imgSrc={User} text="Manage Dishes" link="/mesh/dishes" />
                <MLink imgSrc={Order} text="Manage Subscription" link="/mesh/subscriptions" />
                <MLink imgSrc={Mesh} text="Manage Profile" link="/mesh/profile" />
                <MLink imgSrc={Order} text="Manage Orders" link={`/mesh/orders`} />
            </div>

        </div>
    )
}

export default AdminLeftFixPanel;