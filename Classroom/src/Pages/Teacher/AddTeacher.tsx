import { useForm , SubmitHandler} from "react-hook-form"
import './AddTeacher.scss'
import { useMutation } from "@apollo/client"
import { createTeacher } from "../../graphql/CreateTeacherApi"
import ToastMessage from "../../Components/customComponents/Toast/ToastMessage"
import User from '../../assets/Images/User.svg'
import backBtn from '../../assets/Images/Back_btn.svg'

type FormData = {
    name : string
    subject :[{subject:string , isPrimary:boolean},{subject:string , isPrimary:boolean},{subject:string , isPrimary:boolean},{subject:string , isPrimary:boolean}]
    username : string
    password :string
    profileImageURL:string
}
type Props = {
    setActivePage:(page:string)=> void;
}

const AddTeacher = ({setActivePage}:Props) => {


    const[createTeachers] = useMutation(createTeacher)

    const {register,formState:{errors},handleSubmit} = useForm<FormData>({
        defaultValues:{
            name:"",
            subject:[{subject:"", isPrimary:true},{subject:"", isPrimary:false},{subject:"", isPrimary:false},{subject:"", isPrimary:false}],
            username:"",
            password:"",
            profileImageURL:""
        }
    })

    const onSubmit:SubmitHandler<FormData> = async(values) =>{
        
            try{
                const {data} = await createTeachers({
                    variables:{
                        input: {
                            teacherName: values.name.trim(),
                            subjects: values.subject.map(subject => ({
                                subjectName: subject.subject.trim(),
                                isPrimary: subject.isPrimary
                            })),
                            userName: values.username.trim(),
                            passWord: values.password.trim(),
                            teacherAvatarFileName: values.profileImageURL ? values.profileImageURL : "",
                        }
                    }
                })
                if (data) { 
                    ToastMessage({ message: "Registration success", toastType: "success" });
                    console.log(values)
                  }
            }
            catch(err){
                ToastMessage({ message: "Registration failed", toastType: "error" });
                console.error("Adding Errror",err);
            }
            
        
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <div onClick={()=>setActivePage("all teachers")}>
                    <img src={backBtn}  alt="Image" />
                </div>
                <div>Adding Teacher</div>
                <div></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-section">
                    
                    <div className="profile">
                        <img src={User}  alt="Image" />
                    </div>
                    <button type="button" onClick={()=>document.getElementById('fileInput')?.click()} className='file-input' ><p>Upload photo <span>+</span></p></button> 
                    {/* <input id='fileInput' className='file-input' type="file"  accept='image/*' style={{display:'none'}} required /> */}
                    
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
                        {errors.name && <p className="err-msg">{errors.name.message}</p> }
                    </div>

                    <div>
                        <label htmlFor="subject">Main Subject</label><br />
                        <input 
                        type="text"
                        placeholder="Subject"
                        id="subject"
                        {...register('subject.0.subject',{
                            required:"Main Subject is required"
                        })}
                        />
                        <div className="subject">
                        <input 
                        type="text"
                        placeholder="Add other"
                        id="subject1"
                        {...register('subject.1.subject')}
                        />
                        <input 
                        type="text"
                        id="subject2"
                        {...register('subject.2.subject')}
                        placeholder="Add other"
                        />
                        <input 
                        type="text"
                        placeholder="Add other"
                        id="subject3"
                        {...register('subject.3.subject')}
                        />
                        </div>
                        {errors.subject && <p className="err-msg">{errors.subject.message}</p> }
                    </div>
                    <div>
                        <label htmlFor="username">Login Access</label><br />
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
                        {errors.username && <p className="err-msg">{errors.username.message}</p> }
                    </div>

                    <div>
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
                        {errors.password && <p className="err-msg">{errors.password.message}</p> }
                    </div>
                    <div className="buttons">
                        <button type="reset" className="button1">Clear</button>
                        <button type="submit" className="button2">Save</button>
                    </div>
            </form>
        </div>
    )
}

export default AddTeacher
