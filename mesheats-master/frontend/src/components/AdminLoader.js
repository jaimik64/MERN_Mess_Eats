import React from 'react'
import { FallingLines } from 'react-loader-spinner'

export default function AdminLoader() {

    return (
        <div className='flex justify-center items-center admin-loader'>
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />
        </div>

    )
}

