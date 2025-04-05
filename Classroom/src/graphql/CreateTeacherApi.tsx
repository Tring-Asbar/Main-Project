import { gql } from "@apollo/client";

export const createTeacher = gql`
    mutation CreateTeachers($input: CreateTeachersInput!) {
        createTeachers(input: $input) {
            message
        }
    }
`;

