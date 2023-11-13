import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customLink } from '../../General/NavBar/navbar.module.css';

function LogOut() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    globalThis.location.reload('/');
  };

  return (
    <>
      <a onClick={handleShow} className={customLink}>
        Cerrar sesión
      </a>

      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ opacity: 0.5 }}
            onClick={handleClose}
          ></div>

          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">¿Cerrar sesión?</h5>
                  <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que deseas cerrar sesión?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={handleClose}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => { logout(); handleClose(); }}>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LogOut;
