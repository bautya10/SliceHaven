import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LogOut() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload('/');
  };

  return (
    <>

      <button onClick={handleShow} className="nav-link">Cerrar sesión</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Cerrar sesión?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => { logout(); handleClose(); }}>
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogOut;
