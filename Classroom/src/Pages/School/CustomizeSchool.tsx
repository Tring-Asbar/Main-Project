import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_SCHOOL } from '../../graphql/UpdateSchoolApi'
import { CURRENT_USER } from '../../graphql/query'
import KatonSchool from '../../assets/Images/Katon.svg'
import './CustomizeSchool.scss'
import getDecryptedDataWithSecretKey from '../../utils/getDecryptedDataWithSecretKey'
import ToastMessage from '../../Components/customComponents/Toast/ToastMessage'
import Button from '../../Components/customComponents/Button/Button'

type FormData = {
  schoolname: string
  email: string
  website: string
  description: string
  username: string
  password: string
  avatar:string
}

const CustomizeSchool = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [updateSchoolAdminDetails] = useMutation(UPDATE_SCHOOL)
  const { data , refetch} = useQuery(CURRENT_USER)
  const [avatar,setAvatar] = useState(null)
  const { register, handleSubmit, reset } = useForm<FormData>()

  useEffect(() => {
    if (data) {
      const user = data.getCurrentUser.nodes[0]
      const schoolAdmin = user.schoolAdminsByUId.nodes[0]

      reset({
        schoolname: schoolAdmin?.saName ?? '',
        email: schoolAdmin?.saEmailId ?? '',
        website: schoolAdmin?.saWebsite ?? '',
        description: schoolAdmin?.saDescription ?? '',
        username: user?.uUserName ?? '',
        password: getDecryptedDataWithSecretKey(user?.uUserPassword ?? '').originalText,
        avatar : schoolAdmin?.saAvatarUrl
      })
    }
  }, [data, reset])

  const onSubmit = async (formData: FormData) => {
    const input = {
      schoolName: formData.schoolname.trim(),
      emailId: formData.email.trim(),
      website: formData.website.trim(),
      description: formData.description === '' ? null : formData.description.trim(),
      schoolAvatarFileName: formData.avatar || '',
    }

    try {
      const response = await updateSchoolAdminDetails({ variables: { input } })
      console.log('Update success:', response.data.updateSchoolAdminDetails.message)
      ToastMessage({message:response.data.updateSchoolAdminDetails.message , toastType:'success'})
      refetch()
    } catch (error) {
      console.error('Update failed:', error)
    }
    setIsEditing(false)
  }

  
  return (
    <>
    <div className="school">
      
      <form className="form-fields" onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" className={isEditing?'edit':'disabled'}  disabled={!isEditing} action="Save" />
            <Button type="button" className={isEditing?'disabled':'edit'} onClick={() => setIsEditing(true)}  disabled={isEditing} action="Edit"/>
  
        <div className="profile">
          <img src={KatonSchool} alt="Image" />
        </div>

        <button
          type="button"
          onClick={() => document.getElementById('fileInput')?.click()}
          className="file-input"
          disabled={!isEditing}
        >
          <p>Add Profile Logo  <span>+</span></p>
        </button>
        <input id='fileInput' type="file" accept='image/*' {...register('avatar')}/>
        <div>
          <label htmlFor="schoolname">Name of School</label><br />
          <input type="text" id="schoolname" className={isEditing?"field  ":'readOnly'} readOnly={!isEditing} {...register('schoolname', { required: 'Name is required' })} />
        </div>

        <div>
          <label htmlFor="email">Email</label><br />
          <input type="text" id="email" className={isEditing?"field":'readOnly'} readOnly={!isEditing} {...register('email', { required: 'Email is required' })} />
        </div>

        <div>
          <label htmlFor="website">Website</label><br />
          <input type="text" id="website" className={isEditing?"field":'readOnly'} readOnly={!isEditing} {...register('website')} />
        </div>

        <div>
          <label htmlFor="desc">Description</label><br />
          <textarea id="desc" className={isEditing?"field":'readOnly'} readOnly={!isEditing} {...register('description')} />
        </div>

        <div>
          <label htmlFor="username">Login Access</label><br />
          <input
            type="text"
            id="username"
            readOnly
            className={isEditing?"field":'readOnly'}
            {...register('username', { required: 'Username is required' })}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            readOnly={!isEditing}
            className={isEditing?"field":'readOnly'}
            {...register('password', { required: 'Password is required' })}
          />
        </div>
      </form>
    </div>
    </>
  )
}

export default CustomizeSchool
