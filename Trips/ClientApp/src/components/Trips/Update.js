import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useTripContext } from '../Pages/TripsContext';

const Update = () => {
  const{showUpdate, handleCloseUpdate, selectedTrip} = useTripContext()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateStarted: null,
    dateCompleted: null
  });

  useEffect(() => {
    if (selectedTrip) {
      setFormData({
        name: selectedTrip.name,
        description: selectedTrip.description,
        dateStarted: selectedTrip.dateStarted,
        dateCompleted: selectedTrip.dateCompleted
      });
    }
  }, [selectedTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const postData = async () => {
    const { name, description, dateStarted, dateCompleted } = formData;
    const payload = {
      name:name,
      description:description,
      // dateStarted:  new Date(dateStarted).toISOString(),
      // dateCompleted:  new Date(dateStarted).toISOString(),
    };

    try {
      const response = await axios.put(
        `https://localhost:7144/trips/${selectedTrip.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json', // Use 'application/json' for JSON data
          },
        }
      );
      handleCloseUpdate()
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <>   
        <Modal isOpen={showUpdate} onClose={handleCloseUpdate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <Flex>
                  <FormControl flex={1} marginRight={2}>
                    <FormLabel>Date Started</FormLabel>
                    <Input
                      type="date"
                      name="dateStarted"
                      value={formData.dateStarted}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl flex={1}>
                    <FormLabel>Date Completed</FormLabel>
                    <Input
                      type="date"
                      name="dateCompleted"
                      value={formData.dateCompleted}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Flex>
                <Stack direction="row" spacing={2}>
                  <Button colorScheme="red" onClick={handleCloseUpdate}>
                    Close
                  </Button>
                  <Button colorScheme="blue" type="submit">
                    Save Changes
                  </Button>
                </Stack>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Update;
