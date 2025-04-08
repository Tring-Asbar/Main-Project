import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import './AddTeacher.scss';
import { useMutation, useLazyQuery } from "@apollo/client";
import { createTeacher } from "../../graphql/CreateTeacherApi";
import { teacherById } from "../../graphql/TeacherByIdApi";
import { updateTeacher } from "../../graphql/UpdateTeacherApi";
import { DeleteTeacher } from "../../graphql/DeleteTeacherApi";
import ToastMessage from "../../Components/customComponents/Toast/ToastMessage";
import User from '../../assets/Images/User.svg';
import backBtn from '../../assets/Images/Back_btn.svg';
import { useEffect, useState } from "react";
import getDecryptedDataWithSecretKey from "../../utils/Decrypt";
import { GET_PRESIGNED_URL } from "../../graphql/UploadImageApi";

import moment from "moment";

type SubjectType = {
  subject: string;
  isPrimary: boolean;
};

type FormData = {
  name: string;
  subject: SubjectType[];
  username: string;
  password: string;
  profileImageURL: string;
};

type Props = {
  setActivePage: (page: string) => void;
  selectedTeacherId?: string|null;
};

const AddTeacher = ({ setActivePage, selectedTeacherId }: Props) => {
  const [createTeachers] = useMutation(createTeacher);
  const [updateTeachers] = useMutation(updateTeacher);
  const[deleteTeacherById] = useMutation(DeleteTeacher)
  const [getTeacherById, { data: teacherByIdDetails }] = useLazyQuery(teacherById);
  const [getUploadPresignedUrl] = useLazyQuery(GET_PRESIGNED_URL,{
    fetchPolicy:'network-only'
  });
  const [profileImageURL, setProfileImageURL] = useState<string>(User);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      subject: [
        { subject: "", isPrimary: true },
        { subject: "", isPrimary: false },
        { subject: "", isPrimary: false },
        { subject: "", isPrimary: false },
      ],
      username: "",
      password: "",
      profileImageURL: profileImageURL || "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "subject",
  });

  useEffect(() => {
    if (selectedTeacherId) {
      getTeacherById({ variables: { teacherId: selectedTeacherId } });
    }
    
  }, [selectedTeacherId, getTeacherById]);

  useEffect(() => {
    if (teacherByIdDetails?.teacherByTId) {
      const teacher = teacherByIdDetails.teacherByTId;
      setValue("name", teacher.tName || "");
      setProfileImageURL(teacher.tAvatarUrl || User);

      const filledSubjects = teacher.teacherSubjectsByTId?.nodes?.map((node: any) => ({
        subject: node.subjectBySjId?.sjOriginalName || "",
        isPrimary: node.isPrimary,
      })) || [];

      const defaultSubjects = [
        ...filledSubjects,
        ...Array(4 - filledSubjects.length).fill({ subject: "", isPrimary: false }),
      ].slice(0, 4);

      defaultSubjects.forEach((subj, index) => {
        setValue(`subject.${index}.subject`, subj.subject);
        setValue(`subject.${index}.isPrimary`, subj.isPrimary);
      });

      setValue("username", teacher?.userByUId?.uUserName || "");

      const decryptedPass = getDecryptedDataWithSecretKey(teacher?.userByUId?.uUserPassword || "").originalText;
      setValue("password", decryptedPass || "");
    }
  }, [teacherByIdDetails, setValue]);

  const handleUploadtoS3 = async (file: File, setImageURL: (url: string) => void) => {
    try {
      const originalName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      const sanitizedFileName = originalName.replace(/ /g, '_');
      const lastDotIndex = file.name.lastIndexOf('.');
      const extension = lastDotIndex !== -1 ? file.name.slice(lastDotIndex) : '';
  
      const newFileName = `katon-classroom/images/${sanitizedFileName}-${moment().unix()}${extension}`;
      console.log(newFileName)
  
      const { data } = await getUploadPresignedUrl({ variables: { input: { key: newFileName } } });
  
      const preSignedUrl = data?.getUploadPresignedUrl?.preSignedUrl;
      console.log(preSignedUrl)
      if (!preSignedUrl) 
        throw new Error("Failed to get presigned URL");
  
      const uploadRes = await fetch(preSignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type
        },
        body: file,
      });
  
      if (uploadRes.ok) {
        const uploadedURL = `${import.meta.env.VITE_FRONTEND_URL}${newFileName}`;
        setImageURL(uploadedURL);
        console.log(uploadedURL) 
        
      } else {
        throw new Error("Upload to S3 failed");
      }
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       handleUploadtoS3(file, setProfileImageURL);
    }
  };
  useEffect(() => {
    if (profileImageURL) {
      console.log("profileImageURL updated:", profileImageURL);
    }
  }, [profileImageURL]);

  const handleDelete = async () => {
    try {
      const res = await deleteTeacherById({
        variables: {
          input: {
            teacherId: teacherByIdDetails?.teacherByTId?.tId,
          },
        },
      });

      if (res?.data?.deleteTeacherById?.message) {
        ToastMessage({ message: res.data.deleteTeacherById.message, toastType: "success" });
        setActivePage("all teachers");
        
      }
    } catch (err) {
      console.error("Delete failed", err);
      ToastMessage({ message: "Delete failed", toastType: "error" });
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const filteredSubjects = data.subject.filter((subj) => subj.subject.trim() !== "");

    try {
      if (selectedTeacherId && teacherByIdDetails?.teacherByTId) {
        const input = {
          teacherId: teacherByIdDetails.teacherByTId.tId,
          teacherAvatarUrl: profileImageURL !== User ? profileImageURL : "",
          teacherName: data.name.trim(),
          subjects: filteredSubjects.map(subject => ({
            subjectName: subject.subject.trim(),
            isPrimary: subject.isPrimary
          })),
          ...(data.username && data.username !== teacherByIdDetails.teacherByTId.userByUId.uUserName && {
            userName: data.username.trim()
          }),
          ...(data.password && data.password !== getDecryptedDataWithSecretKey(teacherByIdDetails.teacherByTId.userByUId.uUserPassword).originalText && {
            password: data.password.trim()
          }),
        };

        const { data: updateRes } = await updateTeachers({ variables: { input } });

        if (updateRes) {
          ToastMessage({ message: "Teacher updated successfully", toastType: "success" });
          setActivePage("all teachers");
        }
      } else {
        const { data: createRes } = await createTeachers({
          variables: {
            input: {
              teacherName: data.name.trim(),
              subjects: filteredSubjects.map((subject) => ({
                subjectName: subject.subject.trim(),
                isPrimary: subject.isPrimary,
              })),
              userName: data.username.trim(),
              passWord: data.password.trim(),
              teacherAvatarFileName: profileImageURL !== User ? profileImageURL : "",
            },
          },
        });

        if (createRes) {
          ToastMessage({ message: "Registration success", toastType: "success" });
          reset();
          setProfileImageURL(User);
          setActivePage("all teachers");
        }
      }
    } catch (err) {
      ToastMessage({ message: "Operation failed", toastType: "error" });
      console.error("Submission error", err);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div onClick={() => setActivePage("all teachers")}>
          <img src={backBtn} alt="Back" />
        </div>
        <div>{selectedTeacherId ?"Active" : "Adding Teacher"}</div>
        <div></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-section">
        <div className="profile">
          <img src={profileImageURL} alt="Profile" />
        </div>
        <button
          type="button"
          onClick={() => document.getElementById("fileInput")?.click()}
          className="file-input"
        >
          <p>
            Upload photo <span>+</span>
          </p>
        </button>
        <input id='fileInput' type="file" accept='image/*' 
        {...register("profileImageURL",{
          required:"Please select the image"
        })}
        style={{display:'none'}}  onChange={handleImageUpload}/>
        {errors.profileImageURL && <p className="err-msg">{errors.profileImageURL.message}</p> }

        <div>
          <label htmlFor="name">Name of Teacher</label><br />
          <input
            type="text"
            placeholder="Name"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="err-msg">{errors.name.message}</p>}
        </div>

        <div className="subjects">
          <label htmlFor="subject">Main Subject</label><br />
          {fields.map((field, index) => (
            <div key={field.id} className={index === 0 ? "" : "subject"}>
              <input
                type="text"
                placeholder={index === 0 ? "Subject" : "Add other"}
                id={`subject${index}`}
                {...register(`subject.${index}.subject`, {
                  required: index === 0 ? "Main Subject is required" : false,
                })}
              />
            </div>
          ))}
          {errors.subject?.[0]?.subject && (
            <p className="err-msg">{errors.subject[0].subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="username">Login Access</label><br />
          <input
            type="text"
            placeholder="Username"
            id="username"
            {...register("username", {
              required: "Username is required",
              
              validate:{
                    startsWithAlphabet: value =>
                      /^[a-zA-Z]/.test(value) || "Username must start with alphabets",
                    alphanumeric: value=>
                      /^[a-zA-Z0-9@._-]+$/.test(value) || "Username must contain alphanumeric characters, '@', '.', '-', and '_'",
                    consecutiveCharacters: value =>
                      /(?!.*([@._-])\1\1)/.test(value) || "Username cannot contain more than two consecutive '@', '.', '-', or '_'",
                    onlyNumbers:value =>
                      /^(?!\d+$)/.test(value) || "Username cannot be only numbers", 
                    minLength:value=>
                      /^.{6,}$/.test(value) || "Username should be at least 6 characters",
                    maxLength:value=>
                      /^.{0,50}$/.test(value) || "Username should not exceed 50 characters",

              },
              
              
            })}
          />
          {errors.username && (
            <p className="err-msg">{errors.username.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
              maxLength: {
                value: 30,
                message: "Password should not exceed 30 characters",
              },
            })}
          />
          {errors.password && (
            <p className="err-msg">{errors.password.message}</p>
          )}
        </div>

        <div className="buttons">
        {selectedTeacherId ? (
            <button
            type="button"
              className="button1"
              onClick={()=>handleDelete()}
            >
              Delete
            </button>
          ) : (
            <button type="reset" className="button1">
              Clear
            </button>
          )}
          <button type="submit" className="button2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
