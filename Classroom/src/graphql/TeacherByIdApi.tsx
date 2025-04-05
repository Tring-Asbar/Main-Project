import { gql } from '@apollo/client';

export const teacherById = gql`
  query GetTeacherById($teacherId: UUID!) {
  teacherByTId(tId: $teacherId) {
    tName
    tId
    tIsActive
    tAvatarUrl
    deletedAt
    userByUId {
      uUserName
      uUserPassword
      uId
    }
    teacherSubjectsByTId {
      nodes {
        sjId
        tsId
        isPrimary
        deletedAt
        subjectBySjId {
          sjName
          sjOriginalName
        }
      }
    }
  }
}

`;


  