import logo from "../../../assets/logo/logo.png"
import { Link } from 'react-router-dom';
import { customLink, customNavbar, imgLogo } from './navbar.module.css';

const NavBar = ({user}) => {

  const admin = user?.loguedUser.userFounded.admin

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${customNavbar}`}>
        <div className="container-fluid">
          <div>
            <Link to="/" className="navbar-brand pe-3"><img src={logo} className={imgLogo} alt=""/></Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">

            <ul className="navbar-nav">
           
              <li className="nav-item pb-1 pe-3">
                <Link to="/" className={`nav-link ${customLink}`} aria-current="page">Inicio</Link>
              </li>
              <li className="nav-item pb-1 pe-3">
                <a className={`nav-link ${customLink}`} href="#aboutUs">Quienes somos</a>
              </li>
              <li className="nav-item pb-1 pe-3">
                <a className={`nav-link ${customLink}`} href="#">Reservas</a>
              </li>
              <li className="nav-item pb-1 pe-3">
                <a className={`nav-link ${customLink}`} href="#">Contacto</a>
              </li>
            {user ? 
              <li className="nav-item pb-1 pe-3">
                <Link to="/cerrarSesion" className={`nav-link ${customLink}`}>Cerrar sesion</Link>
              </li>
              :
              <>
              <li className="nav-item pb-1 pe-3">
                  <Link to="/register" className={`nav-link ${customLink}`}>Registrarse</Link>
                </li>
                <li className="nav-item pb-1 pe-3">
                  <Link to="/login" className={`nav-link ${customLink}`}>Iniciar Sesion</Link>
                </li> 
              </>
            }
            {admin &&
              <li className="nav-item pb-1 pe-3">
                <Link to="/admin" className={`nav-link ${customLink}`}>Administracion</Link>
              </li>
            }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar