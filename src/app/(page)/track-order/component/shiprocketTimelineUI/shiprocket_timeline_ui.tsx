import React from 'react'
import ShiprocketOrderDetails from './order_details'
import ShiprocketTrackingACtivities from './tracking_activities'

const ShipRocketTimelineUI = ({ events }: { events: any[] }) => {
    return (
        <div className='sm:flex w-full space-x-5 sm:px-10'>
            <div className='sm:w-1/2'>
                <ShiprocketOrderDetails events={events} />
            </div>
            <div className='sm:w-1/2'>
                <ShiprocketTrackingACtivities events={events} />
            </div>
        </div>
    )
}
export default ShipRocketTimelineUI