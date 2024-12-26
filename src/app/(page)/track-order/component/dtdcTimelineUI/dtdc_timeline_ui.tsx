import React from 'react'
import DTDCOrderDetails from './order_details'
import DTDCTrackingACtivities from './tracking_activities'

const DTDCTimelineUI = ({ events }: { events: any[] }) => {

    return (
        <div className='sm:flex w-full space-x-5 sm:px-10'>
            <div className='sm:w-1/2'>
                <DTDCOrderDetails events={events} />
            </div>
            <div className='sm:w-1/2'>
                <DTDCTrackingACtivities events={events} />
            </div>
        </div>
    )
}

export default DTDCTimelineUI