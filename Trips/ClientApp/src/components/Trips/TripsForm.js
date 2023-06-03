import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Box, Flex } from "@chakra-ui/react"
import { useTripContext } from '../Pages/TripsContext';
import Update from './Update';

function TripsForm({trips}) {
  const { handleShowUpdate, setSelectedTrip, selectedTrip } = useTripContext();
  const updateSelectedTrip = (id) => { 
    const result = trips.find(item => item.id === id);
    setSelectedTrip(result);
    handleShowUpdate();
  }

  return (
    <div className='border mt-5'>
      <Update/>
    <Box maxW="960px" mx="auto">
      <TableContainer>
        <Table>
          <TableCaption>Trips</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              {/* <Th>Description</Th> */}
              <Th>Date Started</Th>
              <Th>Date Completed</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trips.map((trip) => (
              <Tr key={trip.id}>
                <Td>{trip.id}</Td>
                <Td>{trip.name}</Td>
                {/* <Td>{trip.description}</Td> */}
                <Td>{new Date(trip.dateStarted).toLocaleString()}</Td>
                <Td>
                  {trip.dateCompleted
                    ? new Date(trip.dateCompleted).toLocaleString()
                    : '-'}
                </Td>
                <Td>
                  <Button colorScheme="blue" onClick={()=>updateSelectedTrip(trip.id)}>
                    Update Trip
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      
      </Box>

    </div>
  );
}

export default TripsForm;
