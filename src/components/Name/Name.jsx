import React, { useRef, useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import './name.css';
import Profile from '../Profile/Profile';

const Name = (props) => {

  const [validated, setValidated] = useState(false)

  const nombreRef = useRef();
  const segundoNombreRef = useRef();
  const apellidoPaternoRef = useRef();
  const apellidoMaternoRef = useRef();

  const formHandler = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (nombreRef.current?.value &&
      apellidoPaternoRef.current?.value &&
      apellidoMaternoRef.current?.value) {

      const data = {
        vcNombre: nombreRef.current?.value,
        vcSegundoNombre: segundoNombreRef.current?.value,
        vcApellidoPaterno: apellidoPaternoRef.current?.value,
        vcApellidoMaterno: apellidoMaternoRef.current?.value,
      };
      props.getNames(data);
    }

  }

  return (

    <Row>
      <Col xs={3} className="mt-4">
        <Profile />
      </Col>
      <Col xs={9} className=" mt-4">
        <div className='Name'>
          <h5 className='titulo-name'>¿Cuál es tu nombre?</h5>
          <Form noValidate validated={validated} className='mt-4' onSubmit={formHandler}>
            <Form.Group className="mb-3 input-form" controlId="validationCustom01">
              <Form.Control type="text" placeholder="Nombre" ref={nombreRef} required />
            </Form.Group>
            <Form.Group className="mb-3 input-form" controlId="validationCustom02">
              <Form.Control type="text" placeholder="Segundo Nombre" ref={segundoNombreRef} />
            </Form.Group>
            <Form.Group className="mb-3 input-form" controlId="validationCustom03">
              <Form.Control type="text" placeholder="Apellido paterno" ref={apellidoPaternoRef} required />
            </Form.Group>
            <Form.Group className="mb-3 input-form" controlId="validationCustom04">
              <Form.Control type="text" placeholder="Apellido Materno" ref={apellidoMaternoRef} required />
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

export default Name;