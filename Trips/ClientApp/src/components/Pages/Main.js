import React from 'react'
import Trips from './Trips'
import TripProvider from './TripsContext'

function Main() {
  return (
    <div>
          <TripProvider>
          <Trips/>
          </TripProvider>
        
    </div>
  )
}

export default Main