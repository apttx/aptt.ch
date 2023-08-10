export const typeDefs = /* GraphQL */ `
  type Technology {
    id: String!
    name: String!
    icon: String
    enjoyment: Float!
    familiarity: Float!
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
    description: String!
    thumbnail: Image!
    url: String
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
