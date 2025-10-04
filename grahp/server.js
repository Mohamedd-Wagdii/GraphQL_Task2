import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import { schema } from "./schema/schema.js";
import { companyLoader, usersByCompanyLoader } from "./loaders/loaders.js";
import cors from "cors";

const app = express();
app.use(cors());
// connect MongoDB
mongoose.connect("mongodb://localhost:27017/testdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// GraphQL endpoint
// NOTE: here we pass loader instances in context (same style as lecture)
app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: {
      // if you prefer per-request loaders, change these to factory calls
      companyLoader,
      usersByCompanyLoader,
    },
  }))
);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});
