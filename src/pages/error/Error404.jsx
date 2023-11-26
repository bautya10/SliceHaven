import {containerCustom} from "./error.module.css"
import { Link } from "react-router-dom"

const Error404 = () => {
  return (
    <div className={`container d-flex align-items-center justify-content-center ${containerCustom}`}>
      <div className="row">
        <div className="d-flex flex-column justify-content-center">
         <h1 className="display-1">Error404</h1>
          <Link to="/" className="row justify-content-center text-decoration-none">
            <button className="btn btn-primary">volver al inicio</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error404