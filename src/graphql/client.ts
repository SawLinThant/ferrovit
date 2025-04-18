import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
<<<<<<< HEAD
=======
  FetchPolicy,
>>>>>>> upstream/main
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { GraphQLFormattedError } from "graphql";
<<<<<<< HEAD
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
=======
>>>>>>> upstream/main

const logger = {
  error: (message: string, ...args: any[]) =>
    console.error(`[Apollo] ${message}`, ...args),
<<<<<<< HEAD
=======
  info: (message: string, ...args: any[]) =>
    console.info(`[Apollo] ${message}`, ...args),
>>>>>>> upstream/main
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

<<<<<<< HEAD
  const httpLink = new HttpLink({
    uri,
    credentials: "include",
  });
=======
  const linkOptions = {
    uri,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
  };

  if (!isServer) {
    (linkOptions as any).fetchOptions = {
      mode: "cors",
      credentials: "include",
    };
  }

  const httpLink = new HttpLink(linkOptions);
>>>>>>> upstream/main

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
<<<<<<< HEAD

=======
>>>>>>> upstream/main
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
<<<<<<< HEAD
      logger.error(`Network Error: ${networkError.message}`, {
        operation: operation.operationName,
      });
=======
      const error = networkError as any;
      const isCorsError =
        error.message &&
        (error.message.includes("CORS") ||
          error.message.includes("Failed to fetch"));

      logger.error(`Network Error: ${error.message || "Connection failed"}`, {
        operation: operation.operationName,
        statusCode: error.statusCode,
        cors: isCorsError ? "Possible CORS issue detected" : undefined,
        url: operation.getContext()?.uri,
      });

      if (isCorsError && !isServer) {
        console.error(`
CORS Error Detected! 
This happens when the API server doesn't allow requests from ${window.location.origin}.

To fix this, ensure the API server includes these headers in responses:
- Access-Control-Allow-Origin: ${window.location.origin} (or *)
- Access-Control-Allow-Methods: POST, GET, OPTIONS
- Access-Control-Allow-Headers: Content-Type, Authorization

If you're in development, consider using a CORS proxy or browser extension.
`);
      }
>>>>>>> upstream/main
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
<<<<<<< HEAD
      retryIf: (error) => !!error && error.statusCode >= 500,
=======
      retryIf: (error) => {
        const statusCode = (error as any).statusCode;
        return statusCode >= 500 || statusCode === 429;
      },
>>>>>>> upstream/main
    },
  });

  const link = from([errorLink, retryLink, authLink, httpLink]);

<<<<<<< HEAD
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
=======
  const cache = new InMemoryCache();
>>>>>>> upstream/main

  return new ApolloClient({
    link,
    cache,
<<<<<<< HEAD
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: isServer ? "network-only" : "cache-only",
=======
    ssrMode: isServer,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: (isServer
          ? "no-cache"
          : "cache-and-network") as FetchPolicy,
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: (isServer
          ? "no-cache"
          : "cache-and-network") as FetchPolicy,
>>>>>>> upstream/main
        errorPolicy: "all",
      },
    },
  });
};

<<<<<<< HEAD
let apolloClient: ApolloClient<any> | null = null;

/**
 * Gets or initializes the Apollo Client
 * @param initialConfig - Optional initial configuration
 * @returns Apollo Client instance
 */
export const getApolloClient = (
  initialConfig?: Partial<ApolloClientConfig>
): ApolloClient<any> => {
  const isServer = typeof window === "undefined";
  let authToken =
    initialConfig?.authToken ?? process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (isServer) {
    try {
      const cookieStore = cookies() as unknown as ReadonlyRequestCookies;
      authToken = cookieStore.get("auth_token")?.value ?? authToken;
    } catch (error) {
      logger.error("Failed to access cookies synchronously", error);
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

export const client = getApolloClient();
=======
let clientInstance: ApolloClient<any> | null = null;
let serverInstance: ApolloClient<any> | null = null;

/**
 * Gets or creates a server-side Apollo Client instance
 */
export const getServerApolloClient = async (
  initialConfig?: Partial<ApolloClientConfig>
): Promise<ApolloClient<any>> => {
  if (serverInstance) {
    return serverInstance;
  }

  const config: ApolloClientConfig = {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
    isServer: true,
    ...initialConfig,
  };

  serverInstance = createApolloClient(config);
  return serverInstance;
};

/**
 * Gets or creates a client-side Apollo Client instance
 */
export const getClientApolloClient = (
  initialConfig?: Partial<ApolloClientConfig>
): ApolloClient<any> => {
  if (clientInstance) {
    return clientInstance;
  }

  let uri =
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

  if (typeof window !== "undefined") {
    uri = "/api/graphql";
  }

  const config: ApolloClientConfig = {
    uri,
    isServer: false,
    ...initialConfig,
  };

  clientInstance = createApolloClient(config);
  return clientInstance;
};

export const client = getClientApolloClient();
>>>>>>> upstream/main
