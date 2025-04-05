import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import './AddTeacher.scss';
import { useMutation, useLazyQuery } from "@apollo/client";
import { createTeacher } from "../../graphql/CreateTeacherApi";
import { teacherById } from "../../graphql/TeacherByIdApi";
import { updateTeacher } from "../../graphql/UpdateTeacherApi";
import ToastMessage from "../../Components/customComponents/Toast/ToastMessage";
import User from '../../assets/Images/User.svg';
import backBtn from '../../assets/Images/Back_btn.svg';
import { useEffect, useState } from "react";
import getDecryptedDataWithSecretKey from "../../utils/Decrypt";

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
  const [getTeacherById, { data: teacherByIdDetails }] = useLazyQuery(teacherById);
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
      profileImageURL: "",
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

      // Username
      setValue("username", teacher?.userByUId?.uUserName || "");

      // Decrypt password
      const decryptedPass = getDecryptedDataWithSecretKey(teacher?.userByUId?.uUserPassword || "").originalText;
      setValue("password", decryptedPass || "");
    }
  }, [teacherByIdDetails, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const filteredSubjects = data.subject.filter((subj) => subj.subject.trim() !== "");

    try {
      if (selectedTeacherId && teacherByIdDetails?.teacherByTId) {
        // UPDATE logic
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
        // CREATE logic
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
        <div>{selectedTeacherId ? "Edit Teacher" : "Adding Teacher"}</div>
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
        {/* Optional file input: You can implement file upload if needed */}
        {/* <input id='fileInput' type="file" accept='image/*' style={{display:'none'}} /> */}

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

        <div>
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
              minLength: {
                value: 6,
                message: "Username should be at least 6 characters",
              },
              maxLength: {
                value: 50,
                message: "Username should not exceed 50 characters",
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
          <button type="reset" className="button1">
            Clear
          </button>
          <button type="submit" className="button2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
