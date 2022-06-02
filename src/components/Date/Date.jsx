import React, { useState, useRef } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './date.css';
import Profile from '../Profile/Profile';
import moment from 'moment';
import 'moment/locale/es-mx';

const Date = (props) => {

  const [validated, setValidated] = useState(false)

  const diaRef = useRef();
  const mesRef = useRef();
  const anioRef = useRef();

  const formHandler = (event) => {

    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (diaRef.current?.value &&
      mesRef.current?.value &&
      anioRef.current?.value) {

      let fecha = moment(anioRef.current?.value + '-' + mesRef.current?.value + '-' + diaRef.current?.value);

      if (fecha.isValid()) {
        let date = {
          dtNacimiento: fecha,
          fechaString: fecha.format('DD MMMM YYYY')
        }
        props.getDate(date);
      }else{

      }

    }
  }

  return (
    <Row>
      <Col xs={3} className="mt-4">
        <Profile />
      </Col >
      <Col xs={9} className="mt-4">
        <div className='Name'>
          <h5 className='titulo-name'>¿Cuál es tu fecha de nacimiento?</h5>
          <Form noValidate validated={validated} className='mt-4' onSubmit={formHandler}>
            <Form.Group className="mb-3 input-form" controlId="validationCustom01">
              <Form.Control type="number" placeholder="Día" min={1} max={31} ref={diaRef} required />
            </Form.Group>
            <Form.Group className="mb-3 input-form" controlId="validationCustom02">
              <Form.Select ref={mesRef} required >
                <option value=''>Mes</option>
                <option value='01'>Enero</option>
                <option value='02'>Febrero</option>
                <option value='03'>Marzo</option>
                <option value='04'>Abril</option>
                <option value='05'>Mayo</option>
                <option value='06'>Junio</option>
                <option value='07'>Julio</option>
                <option value='08'>Agosto</option>
                <option value='09'>Septiembre</option>
                <option value='10'>Octubre</option>
                <option value='11'>Noviembre</option>
                <option value='12'>Diciembre</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 input-form" controlId="validationCustom03">
              <Form.Control type="number" placeholder="Año" min={1930} max={moment().year()} ref={anioRef} required />
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

export default Date;