import { createContext, useContext } from "react";
import React, { useEffect, useState } from 'react';

const TripContext = createContext();

const TripProvider = ({ children }) => {
    const [tripsData, setTripsData] = useState([]);
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState({});
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const handleCloseUpdate = () => setShowUpdate(false);

    return (
      <TripContext.Provider
        value={{
            tripsData,
            setTripsData,
            show,
            showUpdate,
            selectedTrip,
            setSelectedTrip,
            handleShow,
            handleClose,
            handleShowUpdate,
            handleCloseUpdate,
        }}
      >
        {children}
      </TripContext.Provider>
    );
  };
  
  export const useTripContext = () => useContext(TripContext);
  export default TripProvider;

