const { ApolloServer, gql } = require("apollo-server");
const mocksData = require("./mocks");
const data = require("./schema.json");

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
