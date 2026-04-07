import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Person {
    id: ID!
    name: String!
    age: Int
    profile: Profile
  }

  type Profile {
    id: ID!
    occupation: String
    phone: String
    person: Person
  }

  type Project {
    id: ID!
    name: String!
    description: String
    startDate: String
    endDate: String
    tasks: [Task]
  }

  type Task {
    id: ID!
    titulo: String!
    finished: Boolean
    person: Person
    projects: [Project]
  }

  type Query {
    getAllUsers: [User]
    getAllPeople: [Person]
    getAllProfiles: [Profile]
    getAllProjects: [Project]
    getTasks: [Task]
  }

  type Mutation {
    # Auth
    register(email: String!, password: String!): String
    login(email: String!, password: String!): String

    # User
    deleteUser(id: ID!): String
    updateUser(id: ID!, email: String, password: String): String

    # Person
    createPerson(name: String!, age: Int): Person
    deletePerson(id: ID!): String
    updatePerson(id: ID!, name: String, age: Int): Person

    # Profile
    createProfile(occupation: String, phone: String, personId: ID!): Profile
    deleteProfile(id: ID!): String
    updateProfile(id: ID!, occupation: String, phone: String): Profile

    # Project
    createProject(
      name: String!
      description: String
      startDate: String
      endDate: String
      taskIds: [ID]
    ): Project
    deleteProject(id: ID!): String
    updateProject(
      id: ID!
      name: String
      description: String
      startDate: String
      endDate: String
    ): Project

    # Task
    createTask(titulo: String!, personId: ID, projectIds: [ID]): Task
    deleteTask(id: ID!): String
    updateTask(id: ID!, titulo: String, finished: Boolean): Task
  }
`;
