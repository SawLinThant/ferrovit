'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { getClientApolloClient } from '@/graphql/client';

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getClientApolloClient();

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
} 