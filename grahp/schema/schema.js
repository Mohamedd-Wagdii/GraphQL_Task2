import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLError,
} from "graphql";
import { UserType, CompanyType } from "./types.js";
import User from "../models/userModel.js";
import Company from "../models/companyModel.js";
import { fieldsList } from "graphql-fields-list";

// ================== QUERIES ==================
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, { id }) {
        return await User.findById(id);
      },
    },

    users: {
      type: new GraphQLList(UserType),
      async resolve(_, __, ___, info) {
        const requested = fieldsList(info) || [];
        const projection = {};

        for (const field of requested) {
          projection[field === "company" ? "companyId" : field] = 1;
        }

        const query = Object.keys(projection).length
          ? User.find().select(projection)
          : User.find();

        return await query.exec();
      },
    },

    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(_, { id }) {
        return await Company.findById(id);
      },
    },

    companies: {
      type: new GraphQLList(CompanyType),
      async resolve() {
        return await Company.find();
      },
    },
  }),
});

// ================== MUTATIONS ==================
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  fields: () => ({
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, { firstName, age, companyId }) {
        if (companyId) {
          const exists = await Company.findById(companyId);
          if (!exists) throw new GraphQLError("Company not found!");
        }
        return await User.create({ firstName, age, companyId });
      },
    },

    modifyUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, { id, ...rest }) {
        if (rest.companyId) {
          const exists = await Company.findById(rest.companyId);
          if (!exists) throw new GraphQLError("Company not found!");
        }
        return await User.findByIdAndUpdate(id, rest, { new: true });
      },
    },

    removeUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, { id }) {
        return await User.findByIdAndDelete(id);
      },
    },

    createCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(_, { name, slogan }) {
        return await Company.create({ name, slogan });
      },
    },

    modifyCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(_, { id, ...rest }) {
        return await Company.findByIdAndUpdate(id, rest, { new: true });
      },
    },

    removeCompany: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(_, { id }) {
        return await Company.findByIdAndDelete(id);
      },
    },
  }),
});

// ================== EXPORT ==================
export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
