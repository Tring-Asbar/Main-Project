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
}

const CustomizeSchool = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [updateSchoolAdminDetails] = useMutation(UPDATE_SCHOOL)
  const { data , refetch} = useQuery(CURRENT_USER)

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
        password: getDecryptedDataWithSecretKey(user?.uUserPassword ?? '').originalText
      })
    }
  }, [data, reset])

  const onSubmit = async (formData: FormData) => {
    const input = {
      schoolName: formData.schoolname.trim(),
      emailId: formData.email.trim(),
      website: formData.website.trim(),
      description: formData.description === '' ? null : formData.description.trim(),
      schoolAvatarFileName: null
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

        <div>
          <label htmlFor="schoolname">Name of School</label><br />
          <input type="text" id="schoolname" readOnly={!isEditing} {...register('schoolname', { required: 'Name is required' })} />
        </div>

        <div>
          <label htmlFor="email">Email</label><br />
          <input type="text" id="email" readOnly={!isEditing} {...register('email', { required: 'Email is required' })} />
        </div>

        <div>
          <label htmlFor="website">Website</label><br />
          <input type="text" id="website" readOnly={!isEditing} {...register('website')} />
        </div>

        <div>
          <label htmlFor="desc">Description</label><br />
          <textarea id="desc" readOnly={!isEditing} {...register('description')} />
        </div>

        <div>
          <label htmlFor="username">Login Access</label><br />
          <input
            type="text"
            id="username"
            readOnly
            {...register('username', { required: 'Username is required' })}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            readOnly={!isEditing}
            {...register('password', { required: 'Password is required' })}
          />
        </div>
      </form>
    </div>
    </>
  )
}

export default CustomizeSchool