import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form"
import bg from '../assets/Images/Login-bg.svg'
import './Login.scss'

type FormData={
  email : string
  password:string
}

const Login = () => {

  const {register,handleSubmit,formState:{errors}} = useForm<FormData>({
    defaultValues:{
      email:"",
      password:"",
    },
    mode:'onChange'
  })
  
  const onSubmit:SubmitHandler<FormData> = (values)=>{
    console.log(values)
    
  }
  return (
    <>
      
      <div className="login_container">
      <div className="background">
        <img src={bg} alt="" />
      </div>
        <div className="login_content">
          <div>
            <p className="heading">Log in as School Admin</p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input 
                type='text'
                placeholder = 'Email'
                className="field"
                {...register("email",{
                  required:"Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
                })}
                />
                {errors.email && <p className="err-msg">{errors.email.message}</p>}
              </div>
              <br />
              <div>
                <input 
                type='password'
                placeholder = 'Password'
                className="field"
                {...register("password",{
                  required:"Password is required",
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
                />
                {errors.password && <p className="err-msg">{errors.password.message}</p>}
              </div>
              <div className="submit">
                <div></div>
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
      
    </>
  )
}

export default Login