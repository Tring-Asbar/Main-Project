import './CustomizeSchool.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UPDATE_SCHOOL } from '../../graphql/UpdateSchoolApi'
import { useMutation } from '@apollo/client'

type FormData = {
  schoolname:string
  email:string
  website:string
  description:string
  username:string
  password:string

}

const CustomizeSchool = () => {
  const [updateSchoolAdminDetails] = useMutation(UPDATE_SCHOOL);

  const {register,handleSubmit} = useForm<FormData>({
    defaultValues:{
      schoolname:"Katon",
      email:"Classroom360@mailinator.com",
      website:"",
      description:"",
      username:"schooladmin01",
      password:import.meta.env.VITE_LOGIN_PASSWORD
    }
  })
   const onSubmit: SubmitHandler<FormData> = async (data) => {
    const input = {
    schoolName: data.schoolname.trim(),
      emailId: data.email.trim(),
      website: data.website.trim(),
      description:
        data.description === '' ? null : data.description.trim(),
      schoolAvatarFileName: null,
      userName:data.username.trim(),
      passWord:data.password.trim()
    }
    try {
      const response = await updateSchoolAdminDetails({ variables: { input } });
      console.log('Update success:', response.data.updateSchoolAdminDetails.message);
    } catch (error) {
      console.error('Update failed:', error);
    }
   }

  return (
    <div className="school">
      <form className='form-fields' onSubmit={handleSubmit(onSubmit)}>
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
          disabled={true}
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
