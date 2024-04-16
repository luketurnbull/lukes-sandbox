# lukes sandbox

My website for information and projects

# This is a mono repo with currently two packages:

# backend

Strapi CMS created with TypeScript and runs on NodeJS with a SQLLite Database and GraphQL plugin

# frontend

NextJS App Router with GraphQL Queries to query the CMS

# Running the application

To run this application in dev mode, run `yarn dev:all`

# Adding new content types to the CMS

When adding new content types to the CMS, run Strapi in develop mode and once changes have been made
Run `yarn generate:types` to update the types in the frontend application
