import { useState } from "react"
import { SubmitHandler,useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import bg from '../assets/Images/Login-bg.svg'
import { signIn } from "aws-amplify/auth"
import ToastMessage from "../Components/customComponents/Toast/ToastMessage"
import './Login.scss'
import Button from "../Components/customComponents/Button/Button"

type FormData={
  username : string
  password:string
}

const Login = () => {

  const navigate = useNavigate();

  const [loading,setLoading] = useState(false)

  const {register,handleSubmit,formState:{errors}} = useForm<FormData>({
    defaultValues:{
      username:"",
      password:"",
    },
    mode:'onChange'
  })
  
  const onSubmit:SubmitHandler<FormData> = async(values)=>{
    setLoading(true);
    const {username,password} = values;
    try{
       await signIn({
        username,
        password
      })
      localStorage.setItem('loginpage',username)
      navigate('/admin-dashboard')
    }
    catch(err){
      ToastMessage({ message: "Incorrect Username or Password", toastType: "error" });
      console.error(err);
    }
    setLoading(false)
  }
  return (
    <>
      <div className="login_container">
      <div className="background">
        <img src={bg}  alt="Image" />
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
                placeholder = 'Username'
                className="field"
                {...register("username",{
                  required:"Username is required",
                })}
                />
                {errors.username && <p className="err-msg">{errors.username.message}</p>}
              </div>
              <br />
              <div>
                <input 
                type='password'
                placeholder = 'Password'
                className="field"
                {...register("password",{
                  required:"Password is required",
                })}
                />
                {errors.password && <p className="err-msg">{errors.password.message}</p>}
              </div>
              <div className="submit">
                <div></div>
                <Button type="submit" action='Login' disabled={loading}/>
              </div>
            </form>
          </div>
        </div>
        
      </div>
      
    </>
  )
}

export default Login
