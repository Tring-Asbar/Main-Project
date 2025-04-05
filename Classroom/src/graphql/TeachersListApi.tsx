import { gql } from "@apollo/client";

export const teachersList = gql`
    query getAllTeachers($limit: Int, $offset: Int, $orderBy: [TeachersOrderBy!], $searchInput: String! = "%") {
  allTeachers(
    first: $limit
    offset: $offset
    orderBy: $orderBy
    condition: {deletedAt: null}
    filter: {tName: {likeInsensitive: $searchInput}}
  ) {
    nodes {
      teacherId: tId
      teacherName: tName
      avatarUrl: tAvatarUrl
      mainSubject: teacherSubjectsByTId(condition: {isPrimary: true, deletedAt: null}) {
        nodes {
          tsId
          subjectBySjId {
            subjectId: sjId
            subjectName: sjName
            subjectOriginalName: sjOriginalName
          }
          isPrimary
        }
      }
    }
    totalCount
  }
}
`;
