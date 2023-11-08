import LoginForm from '../../components/Specific/loginForm/LoginForm'

const Login = ({setUser}) => {
  return (
    <div>
      <div className='container'>
        <div className='row d-flex justify-content-center pt-5'>
          <LoginForm setUser={setUser}/>
        </div>
      </div>
    </div>
  )
}

export default Login