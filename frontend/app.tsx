import React, { ComponentType } from 'react';
import { useDeno } from 'aleph/react';
import { getEnv, getTypes } from '~/lib/index.ts';

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  const apiUrl = getEnv("API_URL");
  const yamlTypes = useDeno(async () => await getTypes());
  
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <Page apiUrl={apiUrl} yamlTypes={yamlTypes} {...pageProps} />
    </main>
  );
}
