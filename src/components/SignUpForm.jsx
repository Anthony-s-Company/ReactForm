/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCol,
  MDBRow
}
from 'mdb-react-ui-kit';
import BasicModal from "./BasicModal";

const SIGN_UP_URL = "https://fsa-jwt-practice.herokuapp.com/signup";

export default function SignUpForm({token, setToken}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSigned, setIsSigned] = useState(false);
  const [msg, setMsg] = useState("");

  function resetForm() {
    setUsername("");
    setPassword("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      username,
      password
    };

    if(username.length > 8 && password.length > 8){
      try {
        const response = await fetch(SIGN_UP_URL,
          {
              method: 'POST',
              body: JSON.stringify(newUser),
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
      const result = await response.json();
      setToken(result.token);
      setIsSigned(true);
      setMsg(result.message);
      resetForm();
  
      } catch (error) {
        setError(error.message);
      }
    }else{
      setError("All Field Require at least 8 Characters")
      setIsSigned(true);
    }
  }

  return (
    <>
    {error && <BasicModal isVisible={isSigned} setIsVisible={setIsSigned} message={error}/>}
    {token && <BasicModal isVisible={isSigned} setIsVisible={setIsSigned} message={msg}/>}
    <form method="post" onSubmit={handleSubmit}>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
          <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
            <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' 
                      value={username} 
                      onChange={(e) => {setUsername(e.target.value);}}
            />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'
                      value={password}
                      onChange={(e) => {setPassword(e.target.value);}}
            />
            <MDBRow className='mb-4'>
              <MDBCol>
                <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'
                        type="submit"> Register
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn className='mb-4 w-100 btn btn-warning-4' size='lg'
                        type="reset" onClick={resetForm}>Reset
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
    </>
  );
}