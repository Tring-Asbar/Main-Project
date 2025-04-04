import './CustomizeSchool.scss'
import { useForm } from 'react-hook-form'

type FormData = {
  schoolname:string
  email:string
  website:string
  description:string
  username:string
  password:string

}

const CustomizeSchool = () => {

  const {register} = useForm<FormData>({
    defaultValues:{
      schoolname:"",
      email:"",
      website:"",
      description:"",
      username:"",
      password:"",
    }
  })

  return (
    <div className="school">
      <form className='form-fields'>
        <button className='edit'style={{display:'flex',justifyContent:'end'}}>Edit</button>
      <div className="profile">
        <img src=""  alt="Image" />
      </div>
      <button type="button" onClick={()=>document.getElementById('fileInput')?.click()} className='file-input' ><p>Upload photo <span>+</span></p></button> 
        <div>
          <label htmlFor="schoolname">Name of School</label><br />
          <input
          type='text'
          placeholder='School Name'
          id='schoolname'
          {...register('schoolname',{
            required:'Name is required'
          })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input
          type='text'
          placeholder='Email'
          id='email'
          {...register('email',{
            required:'Email is required'
          })}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label><br />
          <input
          type='text'
          placeholder=''
          id='website'
          {...register('website',{
            required:'Website is required'
          })}
          />
        </div>
        <div>
          <label htmlFor="desc">Description</label><br />
          <textarea
          placeholder=''
          id='desc'
          {...register('description',{
            required:'Description is required'
          })}
          />
        </div>
        <div>
          <label htmlFor="username">Login Access</label><br />
          <input
          type='text'
          placeholder='Username'
          id='username'
          {...register('username',{
            required:'Username is required'
          })}
          />
        </div>
        <div>
          <input
          type='text'
          placeholder='Password'
          id='password'
          {...register('password',{
            required:'Password is required'
          })}
          />
        </div>
        
      </form>
    </div>
  )
}

export default CustomizeSchool
