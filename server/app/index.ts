import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import Schema from "./graphql/schema";
import Resolvers from "./graphql/resolvers";
import "dotenv/config";

import mongoose from "mongoose";

const URI: string = process.env.URI as string;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);

    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

async function startAppolloServer(schema: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,

    //tell Express to attach GraphQL functionality to the server
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;

  await server.start();
  //start the GraphQL server.
  connectDB();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  ); //run the server on port 4000

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

//in the end, run the server and pass in our Schema and Resolver.
startAppolloServer(Schema, Resolvers);

// const kitty = new cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
// cat.create({ name: "Yoni" }).then(() => {
//   console.log("meow 2");
// });
