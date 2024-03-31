import { Strapi } from "@strapi/strapi";
import bootstrap from "./bootstrap";

export default {
  register({ strapi }: { strapi: Strapi }) {
    // Extend Strapi with custom resolvers
    // https://strapi.io/blog/extending-and-building-custom-resolvers-with-strapi-v4
    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          skillByName(name: String!): SkillEntityResponse
        }
      `,
      resolvers: {
        Query: {
          skillByName: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const data = await strapi.services["api::skill.skill"].find({
                filters: { name: args.name },
              });

              const response = toEntityResponse(data.results[0]);

              console.log("##################", response, "##################");

              return response;
            },
          },
        },
      },
      resolversConfig: {
        "Query.skillByName": {
          auth: {
            scope: ["api::skill.skill.findOne"],
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap,
};
