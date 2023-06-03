import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripsForm from '../Trips/TripsForm';
import { Button, ButtonGroup, Box } from '@chakra-ui/react'
import Create from '../Trips/Create';
import Update from '../Trips/Update';
import {useTripContext} from './TripsContext';

function Trips() {
    const [loading, setLoading] = useState(true);
    const {setTripsData, tripsData, handleShow} = useTripContext()
    // const handleShowUpdate = (result) => {
    //     setShowUpdate(true);
    //     setSelectedTrip(result);
    // }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://localhost:7144/trips');
                setTripsData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        }
        fetchData();
    }, [tripsData]);


    
    return (
        <div className="trips-dataGrid">
            <Box maxW="960px" mx="auto" pb="7" display="flex" alignItems="center" justifyContent="space-between">
                <h3>Plan your Trips below</h3>
                <Button colorScheme="orange" onClick={handleShow}>Add a Trip</Button>
            </Box>
                {loading ?  <p>Loading...</p> : <TripsForm trips={tripsData}/>
                }
                <div id="createModal">
                    <Create/>
                    {/* {
                        Object.keys(selectedTrip).length > 0 && (
                            <Update
                                selected={selectedTrip}
                                show={showUpdate}
                                handleClose={handleCloseUpdate}
                                selectedTrip={selectedTrip}
                            />
                        )
                    } */}
                </div>
        </div>

    )
}

export default Trips