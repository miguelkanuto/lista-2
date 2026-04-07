import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphQL/typeDefs.js";
import resolvers from "./graphQL/resolvers.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000");
  console.log("GraphQL disponível em http://localhost:3000/graphql");
});
