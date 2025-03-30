import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import bg from '../assets/Images/Login-bg.svg'
import { signIn } from "aws-amplify/auth"
import './Login.scss'

type FormData={
  name : string
  password:string
}

const Login = () => {

  const navigate = useNavigate();

  const {register,handleSubmit,formState:{errors}} = useForm<FormData>({
    defaultValues:{
      name:"",
      password:"",
    },
    mode:'onChange'
  })
  
  const onSubmit:SubmitHandler<FormData> = async(values)=>{
    const {name,password} = values;
    try{
      const user = await signIn({
        username : name,
        password
      })
      console.log(user)
      navigate('/admin-dashboard')
    }
    catch(err){
      console.error(err);
    }
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
                {...register("name",{
                  required:"Username is required",
                })}
                />
                {errors.name && <p className="err-msg">{errors.name.message}</p>}
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