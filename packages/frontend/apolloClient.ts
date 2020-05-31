import {ApolloClient} from "apollo-client";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {split} from "apollo-link";
import {NextPageContext} from "next";
import {getMainDefinition} from "apollo-utilities";

import {WebSocketLink} from "apollo-link-ws";

let wsLink;
if (process.browser) {
  wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
      reconnect: true,
    },
  });
}

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

let link: any = httpLink;
if (process.browser) {
  link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );
}

export default function createApolloClient(
  initialState: NormalizedCacheObject,
  ctx: NextPageContext,
) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link,
    cache: new InMemoryCache({ addTypename: false }).restore(initialState),
  });
}
