import Base from "../core/Base";
import React from "react";
import MeshLeftFixPanel from "./MeshLeftPanel";
import { isAuthenticated } from "../Auth";

const Dashboard = () => {

    const { user } = isAuthenticated();

    return (
        <Base>
            {
                user ? <MeshLeftFixPanel style="box" /> : ""
            }
        </Base>
    )
}
export default Dashboard