// eslint-disable-next-line react/prop-types
const Alert = ({ texto, color, icon }) => {
  return (
    <div className={`alert alert-${color} d-flex align-items-center container mt-3`} role="alert">
      <i className={`${icon} me-2`}> </i>
      <div>
        {texto}
      </div>
    </div>
  )
}

export default Alert