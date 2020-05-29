import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { NextPageContext } from "next";

export default function createApolloClient(
  initialState: NormalizedCacheObject,
  ctx: NextPageContext,
) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache({ addTypename: false }).restore(initialState),
  });
}
