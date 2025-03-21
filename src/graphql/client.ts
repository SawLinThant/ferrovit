import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { GraphQLFormattedError } from "graphql";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

const logger = {
  error: (message: string, ...args: any[]) =>
    console.error(`[Apollo] ${message}`, ...args),
};

interface ApolloClientConfig {
  uri: string;
  authToken?: string;
  retryAttempts?: number;
  isServer?: boolean;
}

/**
 * Creates an Apollo Client instance with advanced configuration
 * @param config - Configuration options for the client
 * @returns Configured Apollo Client instance
 */
const createApolloClient = (config: ApolloClientConfig): ApolloClient<any> => {
  const { uri, authToken, retryAttempts = 3, isServer = false } = config;

  if (!uri) {
    throw new Error("GraphQL API URI is required");
  }

  const httpLink = new HttpLink({
    uri,
    credentials: "include",
  });

  const authLink = new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(
        ({ message, locations, path }: GraphQLFormattedError) => {
          logger.error(`GraphQL Error: ${message}`, {
            operation: operation.operationName,
            locations,
            path,
          });
        }
      );
    }
    if (networkError) {
      logger.error(`Network Error: ${networkError.message}`, {
        operation: operation.operationName,
      });
    }
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: 5000,
      jitter: true,
    },
    attempts: {
      max: isServer ? 0 : retryAttempts,
      retryIf: (error) => !!error && error.statusCode >= 500,
    },
  });

  const link = from([errorLink, retryLink, authLink, httpLink]);

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  });

  return new ApolloClient({
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: isServer ? "network-only" : "cache-only",
        errorPolicy: "all",
      },
    },
  });
};

let apolloClient: ApolloClient<any> | null = null;

/**
 * Gets or initializes the Apollo Client
 * @param initialConfig - Optional initial configuration
 * @returns Apollo Client instance
 */
export const getApolloClient = async (
  initialConfig?: Partial<ApolloClientConfig>
): Promise<ApolloClient<any>> => {
  const isServer = typeof window === "undefined";
  let authToken =
    initialConfig?.authToken ?? process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (isServer) {
    try {
      const cookieStore = await cookies();
      const authCookie = cookieStore.get("auth_token");
      authToken = authCookie?.value ?? authToken;
    } catch (error) {
      logger.error("Failed to access cookies", error);
    }
  }

  const config: ApolloClientConfig = {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API as string,
    authToken,
    retryAttempts: 3,
    isServer,
    ...initialConfig,
  };

  if (isServer) {
    return createApolloClient(config);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(config);
  }

  return apolloClient;
};

// Create a synchronous version for client-side usage
export const getClientApolloClient = (): ApolloClient<any> => {
  if (!apolloClient) {
    apolloClient = createApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API as string,
      isServer: false,
    });
  }
  return apolloClient;
};

// Export a default client for client-side usage
export const client = getClientApolloClient();
