import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  VStack,
  FormErrorMessage
} from '@chakra-ui/react'
import { useTripContext } from '../Pages/TripsContext';

const Create = () => {
  const {show, handleClose,setTripsData} = useTripContext();
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [errors, setErrors] = useState({name:"",descriptions:""});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateStarted: '',
    dateCompleted: ''
  });

  useEffect(()=>{
    if(formData.name == "" || formData.description == "") setButtonDisabled(true)
    else setButtonDisabled(false)
  },[formData])

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
      name,
      description,
      dateStarted: new Date(dateStarted).toISOString(),
      dateCompleted: new Date(dateCompleted).toISOString()
    };

    try {
      const response = await axios.post(
        'https://localhost:7144/trips',
        payload,
        {
          headers: {
            'Content-Type': 'application/json', // Use 'application/json' for JSON data
          },
        }
      );
    fetchData();
      handleClose();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    console.log(formData);
  };
  async function fetchData() {
    try {
        const response = await axios.get('https://localhost:7144/trips');
        setTripsData(response.data);
    } catch (error) {
        console.error('Error fetching trips:', error);
    }
}

  return (
    <>
      <Modal isOpen={show} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a trip</ModalHeader>
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
                   <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                 <FormErrorMessage>{errors.descripton}</FormErrorMessage>
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
                <Stack direction="row" spacing={2} justifyContent='end'>
                  <Button colorScheme="red" onClick={handleClose}>
                    Close
                  </Button>
                  <Button colorScheme="blue" onClick={()=> postData()} type="submit" isDisabled={buttonDisabled}>
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

export default Create;
