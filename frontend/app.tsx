import React, { ComponentType } from 'react';
import { getEnv } from '~/lib/index.ts';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  const url = getEnv("API_URL");
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <main>
        <head>
          <meta name="viewport" content="width=device-width" />
        </head>
        <Page {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
