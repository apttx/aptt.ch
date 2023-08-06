export const typeDefs = /* GraphQL */ `
  type Technology {
    id: String!
    name: String!
    version: String
    icon: String
  }

  type Technology_Group {
    technologies: [Technology!]!
  }

  type Technology_Connection {
    connector: Technology
    source: Technology!
    target: Technology!
  }

  type Image {
    url: String!
  }

  union Project_Technology = Technology | Technology_Group | Technology_Connection

  type Project {
    id: String!
    title: String!
    thumbnail: Image!
    description: String!
    technologies: [Project_Technology!]!
  }

  input User {
    roles: [String!]!
  }

  type Query {
    projects(user: User): [Project!]!
    technologies: [Technology!]!
  }
`
