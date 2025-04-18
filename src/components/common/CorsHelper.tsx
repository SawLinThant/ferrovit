'use client';

import { useState } from 'react';

export function CorsHelper() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Experiencing API connection issues?</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm px-3 py-1 bg-yellow-100 hover:bg-yellow-200 rounded-md"
        >
          {isExpanded ? 'Hide Solutions' : 'Show Solutions'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          <p className="mb-2">
            You're likely experiencing a <strong>CORS (Cross-Origin Resource Sharing)</strong> issue. 
            This is a security feature in browsers that prevents websites from making requests to 
            different domains unless the server explicitly allows it.
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">For development:</h4>
            <ul className="list-disc pl-5">
              <li>Use the local API proxy at <code className="bg-yellow-100 px-1 rounded">/api/graphql</code></li>
              <li>Install a CORS browser extension: 
                <a 
                  href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Chrome
                </a> / 
                <a 
                  href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Firefox
                </a>
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">For production:</h4>
            <ul className="list-disc pl-5">
              <li>The API server needs to add these headers to its responses:
                <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-xs">
                  Access-Control-Allow-Origin: {typeof window !== 'undefined' ? window.location.origin : 'your-domain.com'}<br/>
                  Access-Control-Allow-Methods: POST, GET, OPTIONS<br/>
                  Access-Control-Allow-Headers: Content-Type, Authorization
                </pre>
              </li>
              <li>Or use a server-side API route to proxy the requests</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 