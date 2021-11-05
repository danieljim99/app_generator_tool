import React, { ComponentType, useState } from 'react';
import { useDeno } from 'aleph/react';
import { getEnv, getTypes } from '~/lib/index.ts';
import { ErrorModal } from '~/components/errorModal.tsx';

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  const [error, setError] = useState<string | undefined>(undefined);

  const apiUrl = getEnv("API_URL");

  const yamlTypes = useDeno(async () => await getTypes());

  !error && typeof(yamlTypes) === "string" && setError(yamlTypes);
  
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      {error ?
        <ErrorModal message={error}/>
      :
        <Page apiUrl={apiUrl} yamlTypes={yamlTypes} {...pageProps} />
      }
    </main>
  );
}
