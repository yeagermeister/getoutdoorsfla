const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const axios = require("axios");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = Number.parseInt(process.env.PORT) || 3001;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

app.get("/proxy", async (req, res) => {
  try {
    const origins = req.query.params.origins; // Get origins from query parameter
    const destinations = req.query.params.destinations; // Get destinations from query parameter

    // Make the request to the external API with origins and destinations as parameters
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          key: "AIzaSyCPmuYKoJgPVO2j1Z8L-lwQp89bKOOP8ic", // Update with your actual API key
          origins: origins,
          destinations: destinations,
        },
      }
    );

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
