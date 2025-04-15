import { gql } from "@apollo/client";

export const createTeacher = gql`
    mutation CreateTeachers($input: CreateTeachersInput!) {
        createTeachers(input: $input) {
            message
        }
    }
`;

export const updateTeacher = gql`
mutation updateTeachersByTId($input: UpdateTeacherInp!) {
    updateTeachersByTId(input: $input) {
      message
    }
  }
`;

export const DeleteTeacher = gql`
    mutation deleteTeacher($input:DeleteTeacher!) {
    deleteTeacherById(input: $input) {
        message
    }
}
`;

export const UPDATE_SCHOOL = gql`
  mutation updateSchoolAdmin($input: updateAdminInput!){
    updateSchoolAdminDetails(input: $input) {
      message
    }
  }
`;
