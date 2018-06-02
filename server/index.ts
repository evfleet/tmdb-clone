// tslint:disable-next-line:no-var-requires
require("dotenv").config();

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as next from "next";
import * as redis from "promise-redis";

import schema from "./schema";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();
const client = redis().createClient();

app.prepare().then(() => {
  const server = express();

  server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  server.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      context: {
        movieAPIKey: process.env.MOVIEDB_KEY,
        redis: client
      },
      schema
    })
  );

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    // tslint:disable-next-line:no-console
    console.log(`Ready on http://localhost:${port}`);
  });
});
