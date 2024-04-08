import { gql } from "@apollo/client";

/**
 * Retrieves all skills.
 *
 * @returns A GraphQL query object for retrieving all skills.
 */
export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      data {
        id
        attributes {
          name
          yearsOfExperience
          icon {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
