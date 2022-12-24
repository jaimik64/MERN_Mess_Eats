import React from "react";
import { isAuthenticated } from "../Auth/helper";
import Base from "../core/Base";

import AdminLeftFixPanel from "../components/AdminLeftFixPanel";


const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()

    return (
        <Base className='container p-4'>
            <AdminLeftFixPanel style="box" />
        </Base>
    )
}

export default AdminDashboard;