import React, { useState, useEffect } from 'react';
import Base from '../core/Base'
import { getAllAddresses } from './helper/adminapicall';
import { isAuthenticated } from '../Auth/helper';
import AdminLeftFixPanel from '../components/AdminLeftFixPanel';
import AdminLoader from '../components/AdminLoader';
import MTable from '../components/MTable';

const AllUsers = () => {

    const [addresses, setAddresses] = useState([])
    const [error, setError] = useState(false)
    const { user, token } = isAuthenticated();
    const [isLoading, setIsLoading] = useState(true);


    const loadAddresses = () => {
        getAllAddresses(token, user._id)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setAddresses(data)
                }
                setTimeout(() => { setIsLoading(false) }, 1000)
            })
    }

    useEffect(() => {
        loadAddresses();
    }, [])

    const tableData = () => {

        const cols = [
            { title: 'Address', field: 'address' },
            { title: 'City', field: 'city' },
            { title: 'Pin Code', field: 'pincode' },
            { title: 'User EmailId', field: 'email' }
        ]

        const data = addresses.map((address) => {

            let str = address.userDetail[0].email
            str = str.split('');
            let finalArr = [];
            let len = str.indexOf('@');
            str.forEach((item, pos) => {
                (pos >= 1 && pos <= len - 2) ? finalArr.push('*') : finalArr.push(str[pos]);
            })

            return {
                address: address.address,
                city: address.city,
                pincode: address.pincode,
                email: finalArr.join('')
            }
        });

        return (
            <MTable data={data} cols={cols} title="User Addresses" />
        )
    }

    return (
        <Base>
            <div className='row mt-5'>
                <div className='col-4'>
                    <AdminLeftFixPanel style="side" />
                </div>
                <div className='col-8 tb'>
                    {isLoading ? <AdminLoader /> : tableData()}
                </div>
            </div>
        </Base>
    )
}

export default AllUsers;