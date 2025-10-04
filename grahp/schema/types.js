import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { fieldsList } from "graphql-fields-list";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(user, _args, ctx, info) {
        if (!user.companyId) return null;

        // extract requested fields
        const picked = {};
        for (const f of fieldsList(info) || []) {
          picked[f] = 1;
        }

        // dataloader call with { id, selectionsField }
        return ctx.companyLoader.load({
          id: user.companyId,
          selectionsField: picked,
        });
      },
    },
  }),
});

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(company, _args, ctx) {
        return ctx.usersByCompanyLoader.load(company._id);
      },
    },
  }),
});
