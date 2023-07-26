/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow
}
from 'mdb-react-ui-kit';
import BasicModal from "./BasicModal";

const SIGN_UP_URL = "https://fsa-jwt-practice.herokuapp.com/authenticate";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleClick() {
    try {
      const response = await fetch(
        SIGN_UP_URL,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setIsModalOpen(true);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
    {error && <BasicModal isVisible={isModalOpen} setIsVisible={setIsModalOpen} message={error}/>}
    {successMessage && <BasicModal isVisible={isModalOpen} setIsVisible={setIsModalOpen} message={successMessage}/>}
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
    <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
      <MDBCardBody className='px-5'>
        <h2 className="text-uppercase text-center mb-5">Authenticate</h2>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBBtn onClick={handleClick} 
                    className='mb-4 w-100 gradient-custom-4' 
                    size='lg'> 
                    Login
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  );
}