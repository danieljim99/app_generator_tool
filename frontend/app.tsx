import React, { ComponentType } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import getEnv from '~/lib/getEnv.ts';

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  const client = new ApolloClient({
    uri: getEnv("API_URL"),
    cache: new InMemoryCache()
  });

  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <ApolloProvider client={client}>
        <Page {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
