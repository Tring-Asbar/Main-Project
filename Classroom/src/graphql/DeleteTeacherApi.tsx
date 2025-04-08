import { gql } from "@apollo/client";

export const DeleteTeacher = gql`
    mutation deleteTeacher($input:DeleteTeacher!) {
    deleteTeacherById(input: $input) {
        message
    }
}
`;
