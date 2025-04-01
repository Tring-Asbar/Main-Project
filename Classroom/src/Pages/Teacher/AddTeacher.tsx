import { useForm , SubmitHandler} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import './AddTeacher.scss'

type FormData = {
    name : string
    subject :string
    username : string
    password :string
}

const AddTeacher = () => {

    const navigate = useNavigate();

    const {register,formState:{errors},handleSubmit} = useForm<FormData>({
        defaultValues:{
            name:"",
            subject:"",
            username:"",
            password:"",
        }
    })

    const onSubmit:SubmitHandler<FormData> = (values) =>{
        
        console.log(values);
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <div>&lt;</div>
                <div>Adding Teacher</div>
                <div></div>
            </div>
            <div className="form-section">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name of Teacher</label><br />
                        <input 
                        type="text"
                        placeholder="Name"
                        id="name"
                        {...register('name',{
                            required:"Name is required"
                        })}
                        />
                        {errors.name && <p>{errors.name.message}</p> }
                    </div>

                    <div>
                        <label htmlFor="subject">Main Subject</label><br />
                        <input 
                        type="text"
                        placeholder="Subject"
                        id="subject"
                        {...register('subject',{
                            required:"Main Subject is required"
                        })}
                        />
                        {errors.subject && <p>{errors.subject.message}</p> }
                    </div>

                    <div>
                        <label htmlFor="username">Username</label><br />
                        <input 
                        type="text"
                        placeholder="Username"
                        id="username"
                        {...register('username',{
                            required:"Username is required",
                            minLength:{value:6,message:"Username should be atleast 6 characters"},
                            maxLength:{value:50,message:"Username should not exceed 50 characters"}
                        })}
                        />
                        {errors.username && <p>{errors.username.message}</p> }
                    </div>

                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input 
                        type="password"
                        placeholder="Password"
                        id="password"
                        {...register('password',{
                            required:"Password is required",
                            minLength:{value:8,message:"Password should be atleast 8 characters"},
                            maxLength:{value:30,message:"Password should not exceed 30 characters"}
                        })}
                        />
                        {errors.password && <p>{errors.password.message}</p> }
                    </div>
                    <div className="buttons">
                        <button type="reset" className="button1">Clear</button>
                        <button type="submit" className="button2">Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddTeacher