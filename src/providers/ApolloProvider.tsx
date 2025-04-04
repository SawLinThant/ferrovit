'use client';

import { ApolloProvider as Provider, gql } from '@apollo/client';
import { getClientApolloClient } from '@/graphql/client';
import { ReactNode, useState, useEffect } from 'react';

// Simple query to test connection
const TEST_QUERY = gql`
  query TestConnection {
    __typename
  }
`;

interface ApolloProviderProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  const [error, setError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(true);

  // Create client with CORS-friendly options
  const client = getClientApolloClient({
    retryAttempts: 3
  });

  // Test the connection to detect CORS issues early
  useEffect(() => {
    // Make a simple query to test connection
    client.query({
      query: TEST_QUERY,
      fetchPolicy: 'no-cache'
    }).then(() => {
      // Connection successful
      setIsTestingConnection(false);
    }).catch((err) => {
      console.error('Apollo connection test failed:', err);
      
      // Check for CORS error
      const isCorsError = 
        err.message?.includes('CORS') || 
        err.message?.includes('Failed to fetch');
      
      if (isCorsError) {
        setError(
          'Unable to connect to the API server due to CORS restrictions. ' +
          'This is usually because the API server is not configured to accept requests from this origin.'
        );
      } else {
        setError(`Connection error: ${err.message}`);
      }
      
      setIsTestingConnection(false);
    });
  }, []);

  // Show loading state while testing connection
  if (isTestingConnection) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-700 mr-2"></div>
          <p>Testing API connection...</p>
        </div>
      </div>
    );
  }

  // Show error state if connection failed
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        <h3 className="font-bold mb-2">Connection Error</h3>
        <p>{error}</p>
        <p className="mt-2 text-sm">
          If you're a developer, here are some possible solutions:
        </p>
        <ul className="list-disc pl-5 mt-2 text-sm">
          <li>Ensure the API server has proper CORS headers</li>
          <li>Check that the API server is running and accessible</li>
          <li>Verify the API URL configuration is correct</li>
          <li>Try using the local API proxy at /api/graphql</li>
        </ul>
      </div>
    );
  }

  return <Provider client={client}>{children}</Provider>;
} 