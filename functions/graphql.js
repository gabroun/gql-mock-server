const { ApolloServer, gql } = require("apollo-server-lambda");
const mocksData = require("../src/mocks");
const data = require("../src/schema.json");

const typeDefs = gql`
  type TextBlock {
    id: String!
    text: String!
    blockNumber: Int!
    sentenceIndices: [SentenceIndices!]!
  }

  type SentenceIndices {
    start: Int!
    end: Int!
  }

  type Contract {
    id: String!
    name: String!
    textBlocks: [TextBlock!]!
  }

  type Query {
    getContracts: [Contract!]!
  }
`;

const resolvers = {
  Query: {
    getContracts: () => data.contracts,
  },
};

const mocks = mocksData;

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,
    mockEntireSchema: false,
    playground: true,
  });

  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
};

exports.handler = getHandler;
