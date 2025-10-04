import { gql } from "@apollo/client";


export const GET_USERS = gql`
  query {
    users {
      id
      firstName
      age
      company {
        id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($firstName: String!, $age: Int!, $companyId: ID) {
    addUser(firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
    }
  }
`;

export const GET_COMPANIES = gql`
  query {
    companies {
      id
      name
      slogan
      users {
        id
        firstName
      }
    }
  }
`;

export const ADD_COMPANY = gql`
  mutation AddCompany($name: String!, $slogan: String!) {
    addCompany(name: $name, slogan: $slogan) {
      id
      name
      slogan
    }
  }
`;
