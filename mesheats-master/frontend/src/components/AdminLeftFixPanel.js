import React from "react";
import User from '../res/user.webp'
import Order from '../res/order.png'
import Mesh from '../res/mesh.png'
import Location from '../res/location.png'
import Dish from '../res/Dish.webp'
import AdminLink from "../components/AdminLink";


const AdminLeftFixPanel = ({ style }) => {

    const s = style //+ " p-2 shadow-lg rounded-xl shadow-slate-500";

    return (
        <div className={s}>
            <div className="my-8 ml-2 p-2 px-5 shadow-lg rounded-xl shadow-slate-500 box1">

                <AdminLink imgSrc={User} text="Manage Users" link="/admin/users" />
                <AdminLink imgSrc={Order} text="Manage Orders" link="/admin/orders" />
                <AdminLink imgSrc={Mesh} text="Manage Mess" link="/admin/meshes" />
                <AdminLink imgSrc={Location} text="Manage User address" link="/admin/UserAddress" />
                <AdminLink imgSrc={Dish} text="Manage Dish" link="/admin/allDishes" />
                <AdminLink imgSrc={Mesh} text="Manage Subscriptions" link="/admin/subscriptions" />

            </div>
        </div>
    )
}

export default AdminLeftFixPanel;