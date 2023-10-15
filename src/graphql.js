import gql from "graphql-tag"; // Import gql from graphql-tag

export const REGISTER_MUTATION = gql`
  mutation signup_mutation(
    $email: String!
    $password: String!
    $username: String!
    $firstname: String!
    $lastname: String!
  ) {
    signup(
      email: $email
      password: $password
      username: $username
      firstName: $firstname
      lastName: $lastname
    ) {
      success
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      username
      success
      token
    }
  }
`;

export const CREATE_PDF_MUTATION = gql`
  mutation CreatePDF(
    $title: String!
    $description: String!
    $link: String!
    $author: String!
    $institution_name: String!
  ) {
    createPdf(
      title: $title
      description: $description
      link: $link
      author: $author
      institutionName: $institution_name
    ) {
      pdf {
        author
        createdAt
        description
        downvote
        id
        institutionName
        link
        title
        upvote
      }
    }
  }
`;
export const SEARCH_QUERY = gql`
  query SearchPDF($query: String!) {
    searchPdfs(query: $query) {
      id
      title
      author
      createdAt
      description
      institutionName
      link
      upvote
      downvote
    }
  }
`;

export const UPVOTE_QUERY = gql`
  mutation upvote_pdf($id: Int!) {
    upvotePdf(pdfId: $id) {
      success
    }
  }
`;

export const DOWNVOTE_QUERY = gql`
  mutation downvote_pdf($id: Int!) {
    downvotePdf(pdfId: $id) {
      success
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation Signout {
    signout {
      success
    }
  }
`;

export const USER_POST_QUERY = gql`
  query user_pdf {
    searchPdfsByUser {
      author
      createdAt
      description
      downvote
      id
      institutionName
      link
      title
      upvote
    }
  }
`;

export const PDF_BY_ID = gql`
  query GetPdfById($id: Int!) {
    pdfById(id: $id) {
      author
      createdAt
      description
      downvote
      id
      institutionName
      link
      title
      upvote
    }
  }
`;
export const DELETE_PDF = gql`
  mutation DeletePDF($id: Int!) {
    deletePdf(pdfId: $id) {
      success
    }
  }
`;

export const EDIT_PDF_MUTATION = gql`
  mutation MyMutation(
    $pdfId: Int!
    $author: String!
    $description: String!
    $institutionName: String!
    $link: String!
    $title: String!
  ) {
    editPdf(
      pdfId: $pdfId
      author: $author
      description: $description
      institutionName: $institutionName
      link: $link
      title: $title
    ) {
      pdf {
        author
        createdAt
        description
        downvote
        id
        institutionName
        link
        title
        upvote
      }
    }
  }
`;
