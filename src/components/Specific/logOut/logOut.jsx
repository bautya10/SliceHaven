import { useNavigate } from 'react-router-dom';

function LogOut() {
  const navigate = useNavigate(); 

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/');
    window.location.reload('/');
  };

  return (
    <button onClick={logout}>Cerrar sesión</button>
  );
}

export default LogOut;
