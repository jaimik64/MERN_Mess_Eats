import React, { useState, useEffect } from "react";
import MeshLeftPanel from './MeshLeftPanel'
import Base from "../core/Base";
import { isAuthenticated } from "../../Auth/helper";
import { getAllMeshDishes, removeDish, updateDish, addDishDetails } from "./apicall";
import MTable from "../../components/MTable";
import AdminLoader from "../../components/AdminLoader";

const ManageDishes = () => {

    const { user, token } = isAuthenticated();
    const [dishes, setDishes] = useState();
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getDishes = () => {
        getAllMeshDishes(user._id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setDishes(data)
                }
                setTimeout(() => { setIsLoading(false) }, 1000)
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {

        getDishes();

    }, [])


    const deleteDish = (dishDetails) => {
        setIsLoading(true)

        removeDish(user._id, dishDetails._id, token)
            .then(data => {
                if (data.error)
                    setError(data.error)
                window.location.reload()

            })
    }

    const changeDishDetails = (dishDetails) => {
        setIsLoading(true)

        let dishId = dishDetails._id
        delete dishDetails._id
        delete dishDetails.meshuser

        updateDish(user._id, dishId, token, dishDetails)
            .then(data => {
                if (data.error)
                    setError(data.error)

                window.location.reload()

            })
    }

    const addDish = (dishDetails) => {
        console.log(dishDetails)
        dishDetails.meshuser = user._id
        addDishDetails(user._id, token, dishDetails)
            .then(data => {
                if (data.error)
                    setError(data.error)
                window.location.reload()

            })
    }

    const tableData = () => {
        const cols = [
            {
                title: 'Day',
                field: 'dayname',
                lookup: {
                    "Monday": "Monday",
                    "Tuesday": "Tuesday",
                    "Wednesday": "Wednesday",
                    "Thursday": "Thursday",
                    "Friday": "Friday",
                    "Saturday": "Saturday",
                    "Sunday": "Sunday",
                    "Subscription": "Subscription"
                }
            },
            {
                title: 'Lunch / Dinner / Both',
                field: 'isLunch',
                lookup: { 0: 'Lunch', 1: 'Dinner', 2: 'Both' }
            },
            { title: 'Details', field: 'description' },
            { title: 'Rate', field: 'rate', type: 'numeric' }
        ]

        const data = dishes.map((dish) => { return dish })

        const editable = {
            onRowUpdate: (newData, oldData) => { changeDishDetails(newData) },
            onRowAdd: (newData) => { addDish(newData) },
            onRowDelete: oldData => { deleteDish(oldData) }
        }

        return (
            <div>
                <MTable cols={cols} data={data} title="Dishes" editable={editable} />
            </div>
        )
    }

    return (
        <Base>
            {
                user ?
                    <div className='row mt-5'>
                        <div className='col-4'>
                            <MeshLeftPanel style="side" />
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

export default ManageDishes