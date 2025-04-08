import { gql } from "@apollo/client";

export const UPDATE_SCHOOL = gql`
  mutation updateSchoolAdmin($input: updateAdminInput!){
    updateSchoolAdminDetails(input: $input) {
      message
    }
  }
`;
