import imgLogo from '../../../assets/logo/logo-slice-haven.png'
import { customLink} from "../NavBar/navbar.module.css"
const Footer = () => {
  return (
    <>
    <div className="container">

      <footer className="py-3 my-4">
        <ul className="nav justify-content-md-center border-bottom pb-3 mb-3">
          <a className={`nav-link ${customLink}`} aria-current="page" href="/">Inicio</a>
          <a className={`nav-link ${customLink}`} href="#aboutUs">Quienes somos</a>
          <a className={`nav-link ${customLink}`} href="#contacto">Contacto</a>
          <a className={`nav-link ${customLink}`} href="#reservas">Reservas</a>
        </ul>
        <p className="text-center text-muted">© 2023 Slice Haven <img src={imgLogo} alt="" width={50} /></p>
      </footer>
    </div>
    </>
  )
}

export default Footer