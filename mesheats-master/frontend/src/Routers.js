import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AllUsers from './Admin/AllUsers'
import AdminRoute from './Auth/helper/AdminRoute'
import PrivateRoute from './Auth/helper/PrivateRoute'
import Home from './core/Home'
import AdminDashboard from './user/AdminDashboard'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'
import Dishes from './Admin/AllDishes';
import UserAddress from './Admin/Addresses';
import Orders from './Admin/Orders'
import ManageMesh from './Admin/ManageMesh'
import MTable from './components/MTable'
import MeshDashboard from './user/MeshDashboard'
import meshSignIn from './Mesh/Auth/Signin'
import meshSignUp from './Mesh/Auth/Signup'
import Dashboard from './Mesh/components/Dashboard'
import ManageDishes from './Mesh/components/ManageDishes'
import ManageSubscription from './Mesh/components/ManageSubscription'
import Profile from './Mesh/components/Profile'
import MeshRoute from './Auth/helper/MeshRoute'
import UProfile from './user/Profile'
import ManageAddresses from './user/User/ManageAddresses'
import MeshDetails from './user/User/MeshDetails'
import MDishes from './user/User/Dishes'
import Cart from './user/User/Cart'
import UOrders from './user/User/Orders'
import MessOrders from './Mesh/components/ManageOrders'
import Subscription from './user/User/Subscription'
import ActiveSubscription from './user/User/ActiveSubscription'
import AllSubscriptions from './Admin/AllSubscriptions'
import Settle from './Admin/Settle'
import ForgetPassword from './user/ForgetPassword'

const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/profile' exact component={UProfile} />
                <Route path='/forgetpassword' exact component={ForgetPassword} />

                <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                <PrivateRoute path='/user/addresses' exact component={ManageAddresses} />
                <PrivateRoute path='/user/meshDetails' exact component={MeshDetails} />
                <PrivateRoute path='/user/dishes/:meshId' exact component={MDishes} />
                <PrivateRoute path='/cart' exact component={Cart} />
                <PrivateRoute path='/user/orders' exact component={UOrders} />
                <PrivateRoute path='/user/subscription' exact component={Subscription} />
                <PrivateRoute path='/user/active/subscription' exact component={ActiveSubscription} />

                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/admin/users' exact component={AllUsers} />
                <AdminRoute path='/admin/allDishes' exact component={Dishes} />
                <AdminRoute path='/admin/UserAddress' exact component={UserAddress} />
                <AdminRoute path='/admin/orders' exact component={Orders} />
                <AdminRoute path='/admin/meshes' exact component={ManageMesh} />
                <AdminRoute path='/admin/test' exact component={MTable} />
                <AdminRoute path='/admin/subscriptions' exact component={AllSubscriptions} />
                <AdminRoute path='/admin/settle' exact component={Settle} />

                <Route path='/mesh' exact component={Dashboard} />
                <Route path='/mesh/auth/signin' exact component={meshSignIn} />
                <Route path='/mesh/auth/signup' exact component={meshSignUp} />
                <MeshRoute path='/mesh/dishes' exact component={ManageDishes} />
                <MeshRoute path='/mesh/subscriptions' exact component={ManageSubscription} />
                <MeshRoute path='/mesh/orders' exact component={MessOrders} />
                <MeshRoute path='/mesh/profile' exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;