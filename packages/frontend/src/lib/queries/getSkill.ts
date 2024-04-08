import { gql } from "@apollo/client";

/**
 * Retrieves a skill by its ID.
 *
 * @param id - The ID of the skill to retrieve.
 * @returns A GraphQL query object for retrieving the skill.
 */
export const GET_SKILL = gql`
  query GetSkillQuery($id: ID!) {
    skill(id: $id) {
      data {
        attributes {
          name
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
