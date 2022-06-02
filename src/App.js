import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

// Componentes
import Name from './components/Name/Name';
import Date from './components/Date/Date';
import Details from './components/Details/Details';

import React, { useState } from 'react';

function App() {

  const initialStateNames = {
    vcNombre: '',
    vcSegundoNombre: '',
    vcApellidoPaterno: '',
    vcApellidoMaterno: '',
  }

  const initialStateDate = {
    dtNacimiento: '',
    fechaString: '',
  }

  const initialStateDetails = {
    vcEmail: '',
    vcTelefono: ''
  }

  const [user, setUser] = useState(window.sessionStorage.getItem('user'));

  const [isReady, setReady] = useState(false)

  const [names, setNames] = useState(initialStateNames)

  const [dates, setDate] = useState(initialStateDate)

  const [details, setDetails] = useState(initialStateDetails)

  const getNames = (childData) => {
    setNames(childData)
  }

  const getDate = (childData) => {
    setDate(childData)
  }

  const getDetails = (childData) => {
    setDetails(childData)
  }

  const cerrarSesion = () => {
    window.sessionStorage.setItem('user', '');
    setNames(initialStateNames);
    setDate(initialStateDate);
    setDetails(initialStateDetails);
    setReady(false);
    setUser(window.sessionStorage.getItem('user'));
  }

  const guardarUsuario = async () => {
    const res = await axios.post('http://localhost:3002/api/users', {
      vc_nombre: names.vcNombre,
      vc_segundoNombre: names.vcSegundoNombre,
      vc_apellidoPaterno: names.vcApellidoPaterno,
      vc_apellidoMaterno: names.vcApellidoMaterno,
      dt_nacimiento: dates.dtNacimiento,
      vc_email: details.vcEmail,
      vc_telefono: details.vcTelefono,
    });

    switch (res.status) {
      case 200:
        setReady(true);
        break;
      case 201:
        alert("El correo electrónico ya se encuentra registrado.");
        break;
      default:
        alert("Algo salió mal.");
        break;
    }
  }

  const continuar = () => {
    window.sessionStorage.setItem('user',details.vcEmail);
    setUser(window.sessionStorage.getItem('user'));
  }

  return (
    <div className='app'>
      <div className='chat'>
        <div className='chat-header'>
          <div className='div1'>
            <h6 className='titulo-header'>Titulo de formulario</h6>
            <p className='subtitulo-header'>
              <FontAwesomeIcon icon={faStopwatch} className='iconos-header' />
              En menos de 5 minutos
            </p>
          </div>
          <div className='div2'>
            <FontAwesomeIcon icon={faClipboardQuestion} className='iconos-header2' />
          </div>
        </div>
        <div className='hr'></div>
        {
          !user
            ?
            <Container className='chat-body'>
              <Name getNames={getNames} />
              {
                names.vcNombre && names.vcApellidoPaterno && names.vcApellidoMaterno
                  ?
                  <>
                    <Row>
                      <Col className='mt-4 d-flex justify-content-end'>
                        <div className='respuesta d-flex justify-content-start'>
                          <p className='respuesta-texto'>
                            <span>{names.vcNombre + ' ' + names.vcSegundoNombre + ' ' + names.vcApellidoPaterno + ' ' + names.vcApellidoMaterno}</span>
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Date getDate={getDate} />
                  </>
                  :
                  null
              }
              {
                dates.dtNacimiento &&
                <>
                  <Row>
                    <Col className='mt-4 d-flex justify-content-end'>
                      <div className='respuesta d-flex justify-content-start'>
                        <p className='respuesta-texto'>
                          <span>{dates.fechaString}</span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Details getDetails={getDetails} />
                </>
              }
              {
                details.vcEmail && details.vcTelefono
                  ?
                  <>
                    <Row>
                      <Col className='mt-4 d-flex justify-content-end'>
                        <div className='respuesta d-flex justify-content-start'>
                          <p className='respuesta-texto'>
                            <span className='d-block'>Correo electrónico: {details.vcEmail}</span>
                            <span className='d-block'>Teléfono: {details.vcTelefono}</span>
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='mt-4 d-flex justify-content-end'>
                        <div className='respuesta2 d-flex justify-content-start'>
                          <p className='respuesta-texto'>
                            <span className='d-block'>Si tus datos son correctos por favor continuemos</span>
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='mt-4 d-flex justify-content-center'>
                        <Button variant="info" className='respuesta-button' onClick={guardarUsuario}>Iniciar</Button>
                      </Col>
                    </Row>
                  </>
                  :
                  null
              }
              {
                isReady &&
                <>
                  <Row>
                    <Col className='mt-4 d-flex justify-content-end'>
                      <div className='respuesta-final w-100 d-flex justify-content-start'>
                        <p className='respuesta-texto'>
                          <span className='d-block'>Fecha de nacimiento: {dates.fechaString}</span>
                          <span className='d-block'>Correo electrónico: {details.vcEmail}</span>
                          <span className='d-block'>Teléfono celular: {details.vcTelefono}</span>
                          <span className='d-block'>Nombre: {names.vcNombre + ' ' + names.vcSegundoNombre + ' ' + names.vcApellidoPaterno + ' ' + names.vcApellidoMaterno}</span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='mt-4 mb-4 d-flex justify-content-center'>
                      <div className='alerta d-flex justify-content-center'>
                        <p className='alerta-texto'>
                          <span className='d-block'>Datos guardados correctamente.</span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='mt-4 d-flex justify-content-center'>
                      <Button variant="info" className='respuesta-button' onClick={continuar}>Continuar</Button>
                    </Col>
                  </Row>
                </>
              }
            </Container>
            :
            <Container className='chat-body'>
              <Row>
                <Col className='d-flex flex-column align-items-center mt-4'>
                  <h2>Sesión Iniciada</h2>
                  <Button variant="info" className='respuesta-button' onClick={cerrarSesion}>Cerrar sesión</Button>
                </Col>
              </Row>
            </Container>
        }
      </div>
    </div >
  );
}

export default App;
