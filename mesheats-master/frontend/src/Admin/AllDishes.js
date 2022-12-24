import React, { useState, useEffect } from 'react';
import Base from '../core/Base'
import { getAllDishes } from './helper/adminapicall';
import { isAuthenticated } from '../Auth/helper';
import AdminLeftFixPanel from '../components/AdminLeftFixPanel';
import AdminLoader from '../components/AdminLoader';
import MTable from '../components/MTable'

const AllUsers = () => {

    const [dishes, setDishes] = useState([])
    const [error, setError] = useState(false)
    const { user, token } = isAuthenticated();
    const [isLoading, setIsLoading] = useState(true);

    const loadAllDishes = () => {
        getAllDishes(user._id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setDishes(data)
                    console.log(data)
                }
                setTimeout(() => { setIsLoading(false) }, 1000);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadAllDishes();
    }, [])



    const tableData = () => {

        const cols = [
            { title: 'Day', field: 'dayname' },
            { title: 'Lunch / Dinner / Both', field: 'isLunch', lookup: { 0: "Lunch", 1: "Dinner", 2: "Both" } },
            { title: 'Details', field: 'description' },
            { title: 'Rate', field: 'rate' },
            { title: 'Mesh Name', field: 'name' },
            { title: 'Location', field: 'location' },
            { title: 'City', field: 'city' }
        ]



        const data = dishes.map((dish) => {
            return {
                dayname: dish.dayname,
                isLunch: dish.isLunch,
                description: dish.description,
                rate: dish.rate,
                name: dish.meshUser[0].name,
                location: dish.meshUser[0].location,
                city: dish.meshUser[0].city
            }
        })

        console.log("Data : " + data)
        return (
            <MTable cols={cols} data={data} title="Dishes" />
        )
    }

    return (
        <Base>
            {
                user ?
                    <div className='row mt-5'>
                        <div className='col-4'>
                            <AdminLeftFixPanel style="side" />
                        </div>
                        <div className='col-8 tb'>
                            {isLoading ? <AdminLoader /> : tableData()}
                        </div>
                    </div>
                    : ""
            }

        </Base>
    )
}

export default AllUsers;