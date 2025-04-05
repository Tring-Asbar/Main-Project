import { gql } from "@apollo/client";
export const updateTeacher = gql`
mutation updateTeachersByTId($input: UpdateTeacherInp!) {
    updateTeachersByTId(input: $input) {
      message
    }
  }
`;