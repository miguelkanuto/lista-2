import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    getTasks {
      id
      titulo
      finished
      person {
        id
        name
      }
    }
  }
`;

export const GET_PEOPLE = gql`
  query {
    getAllPeople {
      id
      name
      age
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    getAllProjects {
      id
      name
      description
    }
  }
`;
