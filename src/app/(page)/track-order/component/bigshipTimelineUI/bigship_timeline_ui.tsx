import React from 'react'
import BigshipTrackingACtivities from './tracking_activities'
import BigshipOrderDetails from './order_details'

const BigshipTimelineUI = ({ events }: { events: any[] }) => {
    return (
        <div className='sm:flex w-full space-x-5 sm:px-10'>
            <div className='sm:w-1/2'>
                <BigshipOrderDetails events={events} />
            </div>
            <div className='sm:w-1/2'>
                <BigshipTrackingACtivities events={events} />
            </div>
        </div>
    )
}

export default BigshipTimelineUI