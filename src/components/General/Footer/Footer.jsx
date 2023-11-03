import imgLogo from '../../../assets/logo/logo-slice-haven.png'
import {customLink, customNavbar} from "../NavBar/navbar.module.css"
const Footer = () => {
  return (
    <>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-12 col-md-4 mb-0 text-body-secondary">© 2023 Slice Haven</p>

        <a href="/" className="col-12 col-md-4 d-flex align-items-center justify-content-md-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <img src={imgLogo} alt="" width={100} />
        </a>
        <ul className="nav col-12 col-md-4 justify-content-md-end">
          <li className="nav-item">
            <a className={`nav-link ${customLink}`} aria-current="page" href="/">Inicio</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${customLink}`} href="#">Quienes somos</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${customLink}`} href="#">Reservas</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${customLink}`} href="#">Contacto</a>
          </li>
        </ul>

        <ul className="nav col-md-6 justify-content-end d-none">
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
        </ul>
      </footer>

    </>
  )
}

export default Footer