export const typeDefs = /* GraphQL */ `
  interface Content_Element {
    id: String!
    slug: String!
  }

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

  type Project implements Content_Element {
    title: String!
    description: String!
    thumbnail: Image!
    url: String
    technologies: [Project_Technology!]!
    # content element
    id: String!
    slug: String!
  }

  type Place {
    name: String!
    icon: String
  }

  type Date {
    iso_8601: String!
  }

  type Date_Range {
    start: Date!
    end: Date
  }

  union Activity_Date = Date | Date_Range

  type Activity_Event {
    title: String!
    description: String!
    date: Date!
  }

  type Activity implements Content_Element {
    title: String!
    description: String!
    place: Place
    date: Activity_Date
    projects: [Project!]!
    events: [Activity_Event!]!
    # content element
    id: String!
    slug: String!
  }

  type User {
    roles: [String!]!
  }

  input Project_Where {
    slug: String
    id: String
  }

  type Query {
    project(where: Project_Where): Project
    projects: [Project!]!
    technologies: [Technology!]!
    activities: [Activity!]!
    me: User!
  }
`
