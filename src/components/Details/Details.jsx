import React, { useState, useRef } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './details.css';
import Profile from '../Profile/Profile';

const Details = (props) => {

  const [validated, setValidated] = useState(false)

  const emailRef = useRef();
  const telefonoRef = useRef();

  const formHandler = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (emailRef.current?.value &&
      telefonoRef.current?.value) {

      if (validatePhoneNumber()) {
        const data = {
          vcEmail: emailRef.current?.value,
          vcTelefono: telefonoRef.current?.value
        };
        props.getDetails(data);
      }else{
        
      }
    }
  }

  const validatePhoneNumber = () => {
    let telefono = telefonoRef.current?.value;
    var regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return regex.test(telefono)
  }

  return (
    <Row>
      <Col xs={3} className="mt-4">
        <Profile />
      </Col>
      <Col xs={9} className="mt-4">
        <div className='Name'>
          <h5 className='titulo-name'>Datos de contacto</h5>
          <Form noValidate validated={validated} className='mt-4' onSubmit={formHandler}>
            <Form.Group className="mb-3 input-form" controlId="validationCustom01">
              <Form.Control type="email" placeholder="Correo electrónico" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="mb-3 input-form" controlId="validationCustom02">
              <Form.Control type="number" placeholder="Teléfono celular" ref={telefonoRef} required />
            </Form.Group>
            <Form.Group className="mb-3 input-form">
              <Button variant="info" className='respuesta-button' type='submit'>Responder</Button>
            </Form.Group>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Details;