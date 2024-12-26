import React from 'react'
import DelhiveryOrderDetails from './order_details'
import DelhiveryTrackingACtivities from './tracking_activities'

const DelhiveyTimelineUI = ({ events }: { events: any[] }) => {
    return (
        <div className='sm:flex w-full space-x-5 sm:px-10'>
            <div className='sm:w-1/2'>
                <DelhiveryOrderDetails events={events} />
            </div>
            <div className='sm:w-1/2'>
                <DelhiveryTrackingACtivities events={events} />
            </div>
        </div>
    )
}

export default DelhiveyTimelineUI