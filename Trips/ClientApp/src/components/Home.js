import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripsForm from './Trips/TripsForm';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Create from './Trips/Create';
import Update from './Trips/Update';
import Banner from './Landing/Banner';


export function Home() {
  


  return (
    <div className='container'>
      <Banner/>
    </div>
  );
}

